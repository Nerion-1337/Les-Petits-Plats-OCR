class List_filter {
    constructor(filter) {
      this.filter = filter;
    }
  
    createList_filter() {
      const li = document.createElement("li");
    li.setAttribute("class", "noclose")

  
      const li_filter = `
          ${this.filter}
          `;
  
      li.innerHTML = li_filter;
      return li;
    }
  }
  
  export default List_filter;