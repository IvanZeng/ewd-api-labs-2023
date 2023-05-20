import tvSeriesService from "./../services";

export default (dependencies) => {

  const getTvSeries = async (request, response) => {
    const tvId = request.params.id;
    const tvSeries = await tvSeriesService.getTvSeries(tvId, dependencies);
    response.status(200).json(tvSeries);
  };
  const find = async (request, response) => {
    const query = request.query;
    const tvSeries = await tvSeriesService.find(query, dependencies);
    response.status(200).json(tvSeries);
  };

  return {
    getTvSeries,
    find,
  };
};