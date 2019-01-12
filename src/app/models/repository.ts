export class Repository {
  constructor(json_repository: any) {
    this.author = json_repository.author;
    this.name = json_repository.name;
    this.url = json_repository.url;
    this.description = json_repository.description;
    this.language = json_repository.language;
    this.languageColor = json_repository.languageColor;
    this.stars = json_repository.stars;
    this.forks = json_repository.forks;
    this.currenPeriodStars = json_repository.currentPeriodStars;

  }

  author: string;
  name: string;
  url: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  currenPeriodStars: number;
}
