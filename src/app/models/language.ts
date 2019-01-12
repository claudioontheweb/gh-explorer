export class Language {
  constructor(json_language: any) {
    this.name = json_language.name;
    this.urlParam = json_language.urlParam;

  }

  name: string;
  urlParam: string;
}
