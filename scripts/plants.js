class Plants {
    constructor() {
        this.noResultsDiv = document.getElementById('results-no');
        this.yesResultsDiv = document.getElementById('results-yes');
        this.plants = document.getElementById('plants');
    }

    displayNoResults(visible) {
        this.noResultsDiv.style.display = visible ? 'flex' : 'none';
    }

    displayYesResults(visible) {
        this.yesResultsDiv.style.display = visible ? 'flex' : 'none';
    }

    noData() {
        this.noResultsDiv.style.display = 'flex';
        this.yesResultsDiv.style.display = 'none';
    }

    clear() {
        const itemFirst = document.querySelectorAll('.result__yes--plants--item--first');
        const items = document.querySelectorAll('.result__yes--plants--item');

        itemFirst.forEach(item => {
            item.remove();
        });

        items.forEach(item => {
            item.remove();
        });
    }

    orderByFavorite(plants) {
        const orderPlants = plants.sort(item => {
            return item.staff_favorite ? -1 : 1;
        });

        return orderPlants;
    }

    renderFirstItem(item) {
        const htmlFirstItem = `<div class="result__yes--plants--item--first">
        ${item.staff_favorite ? '<div class="result__yes--plants--item--first--favorite">Staff favorite</div>' : ''}
        
        <div class="result__yes--plants--item--first--img">
          <div>
            <img src="${item.url}" alt="${item.name}" />
          </div>
        </div>

        <div class="result__yes--plants--item--first--footer">
          <div class="result__yes--plants--item--first--footer--name">
            <span>${item.name}</span>
          </div>
          <div class="result__yes--plants--item--first--footer--price">
            <div class="result__yes--plants--item--first--footer--price--value">
              $${item.price}
            </div>
            <div class="result__yes--plants--item--first--footer--price--icons">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>`;

      this.plants.innerHTML += htmlFirstItem;
    }

    renderItem(item) {
        const htmlItem = `<div class="result__yes--plants--item">
        ${item.staff_favorite ? '<div class="result__yes--plants--item--favorite">Staff favorite</div>' : ''}
        <div class="result__yes--plants--item--img">
          <div>
            <img src="${item.url}" alt="${item.name}" />
          </div>
        </div>

        <div class="result__yes--plants--item--footer">
          <div class="result__yes--plants--item--footer--name">
            <span>
              ${item.name}
            </span>
          </div>
          <div class="result__yes--plants--item--footer--price">
            <span>
              $${item.price}
            </span>
            <div class="result__yes--plants--item--footer--price--icons">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>`;

      this.plants.innerHTML += htmlItem;
    }

    render(data) {
        this.clear();
        
        const plantsOrderByFavorite = this.orderByFavorite(data);

        plantsOrderByFavorite.forEach((item, index) => {
            !index
              ? this.renderFirstItem(item)
              : this.renderItem(item);
        });
    }
}

export default Plants;