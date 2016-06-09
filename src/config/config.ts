/**
 * Created by chetan on 30/5/16.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class Configfile {
  private _config: Object;
  private _env: Object;
  constructor(private http: Http) {
  }
  load() {
    return new Promise((resolve, reject) => {
      this.http.get("src/app/config/env.json")
      .map(res => res.json())
        .subscribe((env_data) => {
          this._env = env_data;
          this.http.get("src/app/config/" + env_data.env + ".json")
          .map(res => res.json())
            .catch((error: any) => {
              console.error(error);
              return Observable.throw(error.json().error || "Server error");
            })
            .subscribe((data) => {
              this._config = data;
              resolve(true);
            });
        });
    });
  }

  getEnv(key: any) {
    return this._env[key];
  }
  get(key: any) {
    return this._config[key];
  }
}

export class Config {
  public static get RESTServer(): string { return 'http://localhost:5000/api/'; }
}
