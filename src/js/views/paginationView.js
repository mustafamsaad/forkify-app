import { RES_PER_PAGE } from '../config.js';
import View from './View.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      +this._data.results.length / this._data.resultsPerPage
    );

    // 1 page only
    if (numPages === 1) {
      return '';
    }

    // Page 1 and others
    if (numPages > 1 && curPage === 1) {
      return `
          <button data-goto=${
            curPage + 1
          } class="btn--inline pagination__btn--next" >
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }

    // last page and others
    if (numPages > 1 && curPage === numPages) {
      return `          
    <button data-goto=${curPage - 1} class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>
`;
    }

    // others
    if (numPages > 1) {
      return `
      <button data-goto=${
        curPage - 1
      } class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
      </button>
      <button data-goto=${
        curPage + 1
      } class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
      `;
    }
  }
}

export default new PaginationView();
