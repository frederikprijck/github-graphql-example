import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should search for users', async () => {
    page.navigateTo();
    page.search('john');
    expect(page.getAmountOfSearchResults()).toEqual(5);
  });

  it('should show NoResults when no search results', async () => {
    page.navigateTo();
    page.search('xzezeedqsdseze');
    expect(page.getAmountOfSearchResults()).toEqual(0);
    expect(page.getNoResults().isDisplayed()).toBeTruthy();
  });
});
