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

  const getSimilar = async (request, response) => {
    const movieId = request.params.id;
    const query = request.query;
    const movies = await tvSeriesService.getSimilar(movieId, query, dependencies);
    response.status(200).json(movies);
  };


  return {
    getTvSeries,
    find,
    getSimilar
  };
};