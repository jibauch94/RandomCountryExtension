$(document).ready(function () {

    var cityUrl = "http://localhost/RandomCountryExtension/alt.php/city";
    var countryUrl = "http://localhost/RandomCountryExtension/alt.php/country";


//mainfunction();
    //function mainfunction() {

    $.get(countryUrl, function (data) {
//parse json data
        var countryArray = JSON.parse(data);
// get array length
        var count = countryArray.length;
        console.log(count);

// generating a random number
        var randomNumber = Math.floor((Math.random() * count) + 1);
        //document.write(randomNumber);

//info about the country
        var country = countryArray[randomNumber].Name;
        var continent = countryArray[randomNumber].Continent;
        var region = countryArray[randomNumber].Region;
        var population = countryArray[randomNumber].Population;
        var GNP = countryArray[randomNumber].GNP;
//write the info to screen
        //document.write(" country: ", country, " continent: ", continent, " region: ", region, " pop: ", population, " GNP: ", GNP);

//get capital number of the country
        var capitalNumber = countryArray[randomNumber].Capital;
        $.get((cityUrl + "/" + capitalNumber), function (data2) {
            var capitalData = JSON.parse(data2);
            var capital = capitalData.Name;
            var capitalPopulation = capitalData.Population;
            // document.write("<br>");
            //document.write("----------------- capitalnumber: ",capitalNumber," capital: ",capital, " capPop: ", capitalPopulation);

//creating array with info about a default country
            var countryInfoArray = new Array();
            countryInfoArray[0] = country;
            countryInfoArray[1] = continent;
            countryInfoArray[2] = region;
            countryInfoArray[3] = population;
            countryInfoArray[4] = GNP;
            countryInfoArray[5] = capital;
            countryInfoArray[6] = capitalPopulation;
//creating table with headers
            var countryInfoTable= "<table id='countryTable'><tr><th style='border: 2px solid blue; border-collapse: collapse; text-align: left'>Country</th>";
            countryInfoTable+= "<th style='border: 2px solid blue; border-collapse: collapse; text-align: left'>Continent</th>";
            countryInfoTable+="<th style='border: 2px solid blue; border-collapse: collapse; text-align: left'>Region</th>";
            countryInfoTable+="<th style='border: 2px solid blue; border-collapse: collapse; text-align: left'>Population</th>";
            countryInfoTable+="<th style='border: 2px solid blue; border-collapse: collapse; text-align: left'>GNP</th>";
            countryInfoTable+="<th style='border: 2px solid blue; border-collapse: collapse; text-align: left'>Capital</th>";
            countryInfoTable+="<th style='border: 2px solid blue; border-collapse: collapse; text-align: left'>Capital Population</th></tr>";

            /*countryInfoTable+="<tr><td style='width: 100%;'>---------------</td>";
            countryInfoTable+="<td     style='width: 100%;'>---------------</td>";
            countryInfoTable+="<td     style='width: 100%;'>---------------</td></tr>";
*/
            //placing each object in array in table
            countryInfoTable+="<tr><td style='border: 2px solid blue; border-collapse: collapse; text-align: left'>" + countryInfoArray[0] + "</td>";
            countryInfoTable+="<td style='border: 2px solid blue; border-collapse: collapse; text-align: left'>" + countryInfoArray[1] + "</td>";
            countryInfoTable+="<td style='border: 2px solid blue; border-collapse: collapse; text-align: left'>" + countryInfoArray[2] + "</td>";
            countryInfoTable+="<td style='border: 2px solid blue; border-collapse: collapse; text-align: left'>" + countryInfoArray[3] + "</td>";
            countryInfoTable+="<td style='border: 2px solid blue; border-collapse: collapse; text-align: left'>" + countryInfoArray[4] + "</td>";
            countryInfoTable+="<td style='border: 2px solid blue; border-collapse: collapse; text-align: left'>" + countryInfoArray[5] + "</td>";
            countryInfoTable+="<td style='border: 2px solid blue; border-collapse: collapse; text-align: left'>" + countryInfoArray[6] + "</td></tr>";

            countryInfoTable+="</table>";

document.getElementById("myDiv").innerHTML=countryInfoTable;

            //document.write(countryInfoTable);
            /*//get other cities
                            $.get(cityUrl, function (data3) {
                                var cityArray = JSON.parse(data3);
                                var citiesArray = [];
                                for (var i = 0; i < cityArray.length; i++) {
                                    if (cityArray[i].CountryCode == countryArray[randomNumber].Code) {
                                        if (cityArray[i].ID != capitalNumber) {
                                            citiesArray.push(cityArray[i].Name);
                                        }
                                    }
                                    document.write("<br>", citiesArray);
                                }


                            });*/


        });

    });

    // }

});
