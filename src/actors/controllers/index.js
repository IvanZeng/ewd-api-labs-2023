import actorsService from "./../services";

export default (dependencies) => {

  const getActor = async (request, response) => {
    const actorId = request.params.id;
    const actor = await actorsService.getActor(actorId, dependencies);
    response.status(200).json(actor);
  };
  const find = async (request, response) => {
    const query = request.query;
    const actors = await actorsService.find(query, dependencies);
    response.status(200).json(actors);
  };


  return {
    getActor,
    find
  };
};