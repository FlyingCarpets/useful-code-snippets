class Dogs {
    constructor() {
        this.fetchData();
        this.dogBreeds = [];
    }
    fetchData() {
        $.ajax({
            url: "http://beta.json-generator.com/api/json/get/4yl0BB4HQ",
            type: 'GET'
        }).done((response) => {
            this.dogBreeds = response.dogBreeds;

            this.placeContent();
        });

        //WITH AXIOS
        // axios.get("http://beta.json-generator.com/api/json/get/4yl0BB4HQ")
        //     .then((response) => {
        //         this.dogBreeds = response.data.dogBreeds;
        //
        //         this.placeContent();
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        // WITH FETCH
        // fetch("http://beta.json-generator.com/api/json/get/4yl0BB4HQ")
        //     .then((response)=> response.json()).then((json) => {
        //     this.dogBreeds = json;
        //
        //     this.placeContent(this.dogBreeds.dogBreeds);
        // });
    }
    placeContent() {
        document.getElementById("js-content").innerHTML = '';

        this.dogBreeds.map((breed) => {
            const template =
                `
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-block">
                            <h4 class="card-title">${breed.breed}</h4>
                            <div class="card-text">
                                <div>
                                    <span>Eye color:</span>
                                    <span>${breed.eyeColor}</span>
                                </div>
                                <div>
                                    <span>Height:</span>
                                    <span>${breed.height} cm</span>
                                </div>
                            </div>
                            <a href="#" class="btn btn-primary">Read more</a>
                        </div>
                    </div>
                </div>        
                `;

            $('#js-content').append(template);

            // VANILLA JS
            // const newElement = document.createElement(`li`);
            // const textToInsert = document.createTextNode(breed.breed);
            // newElement.appendChild(textToInsert);
            // document.getElementById('js-content').appendChild(newElement);
        });

        this.bindFilterActions();
    }
    bindFilterActions() {
        this.allFilterLinks.map((filterLink) => {
            filterLink.addEventListener('click', () => {
                this.filterResults(filterLink);
            })
        });
    }
    filterResults(filterLink) {
        const filterName = filterLink.getAttribute('data-name');
        const filterAttribute = filterLink.getAttribute('data-filter');
        const allDogBreeds = this.dogBreeds;

        this.dogBreeds = [];

        allDogBreeds.filter((item) => {
            if(item[filterName] == filterAttribute) {
                this.dogBreeds.push(item);
            }
        });

        this.placeContent();
    }
    get allFilterLinks() {
        return Array.from(document.querySelectorAll('.js-filter'));
    }
}

const dogs = new Dogs();
