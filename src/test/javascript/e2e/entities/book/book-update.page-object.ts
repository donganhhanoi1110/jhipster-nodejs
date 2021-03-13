import { element, by, ElementFinder } from 'protractor';

export default class BookUpdatePage {
  pageTitle: ElementFinder = element(by.id('nhipsterappApp.book.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#book-title'));
  authorInput: ElementFinder = element(by.css('input#book-author'));
  yearInput: ElementFinder = element(by.css('input#book-year'));
  manyUserToOneBookSelect: ElementFinder = element(by.css('select#book-manyUserToOneBook'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setAuthorInput(author) {
    await this.authorInput.sendKeys(author);
  }

  async getAuthorInput() {
    return this.authorInput.getAttribute('value');
  }

  async setYearInput(year) {
    await this.yearInput.sendKeys(year);
  }

  async getYearInput() {
    return this.yearInput.getAttribute('value');
  }

  async manyUserToOneBookSelectLastOption() {
    await this.manyUserToOneBookSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async manyUserToOneBookSelectOption(option) {
    await this.manyUserToOneBookSelect.sendKeys(option);
  }

  getManyUserToOneBookSelect() {
    return this.manyUserToOneBookSelect;
  }

  async getManyUserToOneBookSelectedOption() {
    return this.manyUserToOneBookSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
