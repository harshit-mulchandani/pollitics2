import { PollingAppPage } from './app.po';

describe('polling-app App', function() {
  let page: PollingAppPage;

  beforeEach(() => {
    page = new PollingAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
