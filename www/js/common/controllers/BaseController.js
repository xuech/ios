function BaseController() {
    var args, fn, index, key, i, len, dependencies, members, collaborators;
    args = 1 <= arguments.length ? [].slice.call(arguments, 0) : [];

    collaborators = [];
    dependencies = this.constructor.$inject;
    for (index = i = 0, len = dependencies.length; i < len; index = ++i) {
        key = dependencies[index];
        this[key] = collaborators[index] = args[index];
    }

    members = this.constructor.prototype;
    for (key in members) {
        fn = members[key];

        if (typeof fn !== 'function') continue;
        if ((key === 'constructor' || key === 'initialize') || key[0] === '_') continue;

        fn = (function(context, fn) {
            return function() {
                return fn.apply(context, arguments);
            };
        })(this, fn);

        this[key] = fn;

        if (key.lastIndexOf('handle', 0) >= 0) {
            this.$scope[key] = fn;
        }
    }

    this.defineListeners.apply(this, collaborators);
    this.initialize.apply(this, collaborators);
    this.defineScope.apply(this, collaborators);

    (function(context) {
        context.$scope.$on('$destroy', function(evt) {
            context.onDestroy(evt, context.$scope);
        });
    })(this);
}

BaseController.extend = function(protoProps) {
    var parent = this,
        parentCollaborators = parent.prototype.inject,
        collaborators = protoProps.inject || [];

    if ( parentCollaborators ) {
      collaborators = parentCollaborators.concat( collaborators );
    }

    function child() {
        child.__super__.constructor.apply(this, arguments);
    }

    for (var key in parent) {
        if ({}.hasOwnProperty.call(parent, key)) {
            child[key] = parent[key];
        }
    }

    function Surrogate() {
        this.constructor = child;
        this.super = parent.prototype;
    }
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
    child.__super__ = parent.prototype;

    for (var key in protoProps) {
        if ({}.hasOwnProperty.call(protoProps, key)) {
            child.prototype[key] = protoProps[key];
        }
    }

    if (collaborators.indexOf('$scope') < 0) {
        collaborators.unshift('$scope');
    }
    child.$inject = collaborators;

    return child;
};

// Abstract Methods
BaseController.prototype.initialize      = function() {};
BaseController.prototype.defineScope     = function() {};
BaseController.prototype.defineListeners = function() {};
BaseController.prototype.onDestroy       = function() {};


export default BaseController;