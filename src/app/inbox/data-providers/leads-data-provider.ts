import {DataProvider} from "./data-provider";

export class LeadsDataProvider implements DataProvider {
  constructor() {
  }

  getAll() {
    alert("LeadsDataProvider");
  }
}
