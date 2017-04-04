import { Ng4AnimationsPreviewPage } from './app.po';

describe('ng4-animations-preview App', () => {
  let page: Ng4AnimationsPreviewPage;

  beforeEach(() => {
    page = new Ng4AnimationsPreviewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
