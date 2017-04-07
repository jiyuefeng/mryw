import { MrywPage } from './app.po';

describe('mryw App', () => {
  let page: MrywPage;

  beforeEach(() => {
    page = new MrywPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
