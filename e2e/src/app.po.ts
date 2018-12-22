import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText();
  }

  getSearchField() {
    return element(by.css('app-github-search input'));
  }

  getNoResults() {
    return element(by.css('app-no-results'));
  }

  getAmountOfSearchResults() {
    return element.all(by.css('app-github-user')).count();
  }

  search(value: string) {
    return this.getSearchField()
      .sendKeys(value)
      // Currently we have no visual indication of the ended Http call
      // so we use a sleep to wait until the call is over.
      // Generally you want to avoid using sleep's in order to make tests wait for something.
      .then(() => browser.sleep(3000));
  }
}
