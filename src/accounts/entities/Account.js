export default class {
  constructor(
    id = undefined, firstName, lastName, email, password, favourites = [], favouriteActors = [], favouriteTvSeries  = []) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.favourites = favourites;
      this.favouriteActors = favouriteActors;
      this.favouriteTvSeries  = favouriteTvSeries ;
  }
}