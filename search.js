document.onreadystatechange = function () {
    var url = "https://gist.githubusercontent.com/keeguon/2310008/raw/bdc2ce1c1e3f28f9cab5b4393c7549f38361be4e/countries.json";
    var state = document.readyState;
    var countryList;
    var countrySearch = document.getElementById("countrySearch");
    if (state == 'interactive') {
    } else if (state == 'complete') {
        queryCountryList();

        /**
         * @method queryCountryList
         * @description Queries country list using rest api
         */
        function queryCountryList() {
            var xmlhttp = new XMLHttpRequest(),
                xhttp = new XMLHttpRequest(),
                str = '',
                countryIndex;
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    countryList = eval(this.responseText);

                    for (countryIndex = 0; countryIndex < countryList.length; countryIndex++) {
                        str += '<option value="' + countryList[countryIndex].name + '" />'; // Storing options in variable
                    }
                    var my_list = document.getElementById("countrySuggestion");
                    if (my_list.innerHTML) {
                        my_list.innerHTML = str;
                    } else {
                        mylist.appendChild(str);
                    }
                }
            };
            xhttp.open("GET", url, true);
            xhttp.send();
        }

        /**
         * @method getDeleteButtonSVG
         * @desciption draws the delete button
         */

        function getDeleteButtonSVG() {
            return '<svg width="16" height="16" viewBox="0 0 16 16" class = "cancel">'
                + '<g>'
                + '<circle r="8" fill="#ffffff" cx="8" cy="8" class = "cancel"></circle>'
                + '<path  stroke="#000000" d="M 5 5 L 11 11 M 5 11 L 11 5 Z" stroke-opacity="0.5"></path>'
                + '</g>'
                + '</svg>'
        }

        /**
         * @method displaySelectedResult
         * @description displays the selected option element
         * @param {value} value 
         */

        function displaySelectedResult(value) {
            var element = document.createElement('li');
            element.class = "listedCountry";
            element.onclick = function (event) {
                if (event.target.classList.contains('cancel')) {
                    this.parentElement.removeChild(this);
                }
            }
            element.innerHTML = '<p>' + value + '</p> <p>' + getDateAndTime() + '</p>' + getDeleteButtonSVG();
            if (document.getElementById("searchDisplay").append) {
                document.getElementById("searchDisplay").append(element);
            } else {
                document.getElementById("searchDisplay").appendChild(element);
            }
        }

        /**
         * @method getDateAndTime 
         * @description gets the local date and time
         */
        function getDateAndTime() {
            var date = new Date(),
                datetime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "  " + date.getHours() + ":" + date.getMinutes();
            return datetime;
        }

        /**
         * @method onkeypress
         * @description on enter key display the selected result
         * @param event 
         */
        countrySearch.onkeypress = function (event) {
            event = event || window.event;
            if (event.keyCode == 13) {
                event.preventDefault ? event.preventDefault() : (event.returnValue = false);
                var value = document.getElementById("countrySearch").value;

                if (value) {
                    for (var countryIndex = 0; countryIndex < countryList.length; countryIndex++) {
                        if (countryList[countryIndex].name === value) {
                            displaySelectedResult(value);
                            document.getElementById("countrySearch").value = '';
                            return;
                        }
                    }
                }
            }
        }
    }
}