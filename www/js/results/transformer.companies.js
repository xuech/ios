function ResultsTransformerCompanies(CompaniesTransformer) {

  let transformer = CompaniesTransformer.names.transformResponse()
    .then( require('./filters/transformer.companies') );

  return transformer;

}

module.exports = ['CompaniesTransformer', ResultsTransformerCompanies];