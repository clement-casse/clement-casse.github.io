/**
 * File: `app/resume/resume.js`
 *
 */

'use strict';

var resumeApp = angular.module('application.resume', ['ngRoute']);

resumeApp.value('modulePreferences', {
    languages: [
        "fr",
        "en"
    ],
    resumes: [
        "default",
        "infosec",
        "develop",
        "embedded"
    ]
});

// #    ROUTE       -----------------------------------------------------------------------

resumeApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/resume/:localeId/:resumeId', {
        templateUrl: 'resume/resume.html',
        controller: 'resumeController'
    });
}]);

// #    DIRECTIVES  -----------------------------------------------------------------------
/**
 * Directive to generate the identity section of the resume
 */
resumeApp.directive('identity', function() {

    return {
        restrict: 'E',
        scope: {
            object: '=idDataObject'
        },
        templateUrl: 'resume/partials/identity.htm'
    };
});

/**
 * Directive to generate a line of working experience on the resume
 */
resumeApp.directive('workexp', function() {

    return {
        restrict: 'E',
        scope: {
            object: '=expDataObject'
        },
        templateUrl: 'resume/partials/workExperience.htm'
    };
});

/**
 * Directive to generate a line of study experience on the resume
 */
resumeApp.directive('study', function(){

    return {
        restrict: 'E',
        scope: {
            object: '=studyDataObject'
        },
        templateUrl: 'resume/partials/study.htm'
    };
});

/**
 * Directive to generate a skill entry on the resume
 */
resumeApp.directive('skill', function(){

    return {
        restrict: 'E',
        scope: {
            object: '=skillDataObject'
        },
        templateUrl: 'resume/partials/skill.htm'
    };
});

/**
 *
 */
resumeApp.directive('chart', ['$filter', function($filter) {

    // A partial application of the filter `pluck`
    var pluck = function(collection, field) {
        return $filter('pluck')(collection, field, false);
    };

    return {
        restrict: 'E',
        template: '<canvas></canvas>',
        scope: {
            object: '=listDataObject'
        },
        link: function(scope, element, attributes) {

            var canvas = element.find('canvas')[0];
            canvas.width  = attributes.width;
            canvas.height = attributes.height;

            var chart = new Chart(canvas.getContext('2d')),
                chartData = {
                labels: pluck(scope.object, 'name'),
                datasets: [{
                    data: pluck(scope.object, 'level').map(function(current) {
                        return current.mark ;
                    }),

                    // Line, Bar & Radar Chart options
                    fillColor:   attributes.chartFillColor   || "rgba(220,220,220,0.2)",
                    strokeColor: attributes.chartStrokeColor || "rgba(220,220,220,1)",

                    // Line & Radar Charts option ONLY
                    pointColor:           attributes.chartPointColor           || "rgba(220,220,220,1)",
                    pointStrokeColor:     attributes.chartPointStrokeColor     || "#fff",
                    pointHighlightFill:   attributes.chartPointHighlightFill   || "#fff",
                    pointHighlightStroke: attributes.chartPointHighlightStroke || "rgba(220,220,220,1)",

                    // Bar charts options ONLY
                    highlightFill:   attributes.chartHighlightFill   || "rgba(220,220,220,0.75)",
                    highlightStroke: attributes.chartHighlightStroke || "rgba(220,220,220,1)"
                }]
            },
            chartOption = {
                showTooltips: false,
                scaleBeginAtZero : true,
                pointDot: false,
                pointLabelFontFamily: attributes.optPointLabelFontFamily || "'Arial'",
                pointLabelFontSize:   attributes.optPointLabelFontSize   || 10
            };
            chart[attributes.chartType](chartData, chartOption);

        }
    };
}]);

// #    FILTERS     -----------------------------------------------------------------------

/**
 * Filter used to calculate an age from a given date to the current day
 * src: http://stackoverflow.com/questions/24883308/convert-birthday-to-age-in-angularjs
 */
resumeApp.filter('ageFilter', function(){

    function calculateAge(birthday) {
        var ageDifMs = Date.now() - (new Date(birthday)).getTime();
        var ageDate = new Date(ageDifMs);    // milliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return function(birthDate) {
        return calculateAge(birthDate);
    };
});

/**
 * Filter used to display a duration in years, display only one year if the two years to be displayed are the same
 */
resumeApp.filter('durationFilter', function(){

    function createDuration(strDateEnd, strDateStart){

        var dateStart 	= (typeof strDateStart !== 'undefined') ? new Date(strDateStart) : null,
            dateEnd 	= (typeof strDateEnd   !== 'undefined') ? new Date(strDateEnd)   : null;

        /* Case where the start date is not specified */
        if ((dateStart === null) || (dateStart.getUTCFullYear() === dateEnd.getUTCFullYear())){
            return dateEnd.getFullYear();
        }

        return dateStart.getFullYear()+" - "+dateEnd.getFullYear() ;
    }

    return function(objDuration){
        return createDuration(objDuration.end, objDuration.start);
    };
});

/**
 * Filter used to create and/or display arrays
 */
resumeApp.filter('pluck', function(){

    function createArray(array, field) {
        if (!Array.isArray(array)) {
            return [];
        }
        var returnedArray = [];
        array.forEach(function(current){
            if (current.hasOwnProperty(field)){
                returnedArray.push(current[field]);
            }
        });
        return returnedArray;
    }

    return function(arrayList, fieldName, joinValue) {
        /* Default value to `fieldName` = name */
        if (fieldName === undefined){
            fieldName = 'name';
        }
        if (joinValue !== undefined && typeof joinValue === 'string') {
            arrayList = createArray(arrayList, fieldName).join(joinValue);
        }
        else {
            arrayList = createArray(arrayList, fieldName);
        }
        return arrayList;
    };

});

// #    SERVICES    ------------------------------------------------------------------------
resumeApp.factory('resumeParser', ['$routeParams', 'modulePreferences',

    function($routeParams, pref) {

        /**
         * This function returns `true` if an object owns a property named as a locale identifier (listed in the
         * angular value `pref.languages`). When an object owns a locale attribute it is considered as 'final' and
         * the algorithm do not go any further.
         * @param  {Object}  object 	any JS object
         * @return {Boolean}
         */
        var isLocaleObject = function(object) {
            // Use of `Array.prototype.some()` so that language identifiers such as
            // `fr` or `en` can be used among other attributes like `_restrictTo`
            return pref.languages.some(function(lang) {
                return (typeof object[lang] !== 'undefined');
            });
        };

        /**
         * This function returns `true` if an object owns a property named `_restrictTo` with its value set to an array
         * of resume identifiers (listed in the angular value `pref.resumes`).
         * @param  {Object}  object 	Any JS object
         * @return {Boolean}
         */
        var isRestrictedObject = function(object) {
            // Use of `Array.prototype.some()` because the attribute `_restrictTo` can be used at any level of nested
            // objects, even if it does not always make sense.
            return pref.resumes.some(function(resume) {
                // Common case : attr `_restrictTo` not present
                if (object.hasOwnProperty("_restrictTo")){

                    // Case where the attr `_restrictTo` restrict to only one resume
                    if (typeof object._restrictTo === 'string') {
                        return (object._restrictTo === resume);
                    }

                    // Case where the attr `_restrictTo` is an array that list multiple resumes
                    else if (Array.isArray(object._restrictTo)) {
                        return (object._restrictTo.some(function(item) {
                            return (item === resume);
                        }));
                    }
                }
                return false;
            });
        };

        /**
         * Function that translate a data structure according the locale and the
         * resume id retreived in `$routeParams`.
         * @param  {Object} dataStructure [description]
         * @return {Object}               [description]
         */
        return function jsonResumeParser(dataStructure) {
            // Error case
            if (typeof dataStructure === 'undefined') {
                return;
            }

            // First Case: json primitives
            if (typeof dataStructure !== 'object') {
                return dataStructure;
            }

            // Standard case : objects and arrays

            // Break the recursion early if the object is restricted to a view that is not requested.
            // @TODO consider the case where `_restrictTo` is set to a single string and not an array
            if (isRestrictedObject(dataStructure)) {
                if (dataStructure._restrictTo.indexOf($routeParams.resumeId) === -1) {
                    return;
                }
            }

            // Case where the object is an array, it trigger the recursion on each array elements
            if (Array.isArray(dataStructure)) {
                var array = [];
                dataStructure.forEach(function(current) {
                    var tmp = jsonResumeParser(current); // to avoid tu push 'undefined' into table
                    if (tmp !== undefined) {
                        array.push(tmp);
                    }
                });
                return array;
            }

            // Case where the object found need to be translated, according to the `localeId` requested in the URI.
            // In the analysed structure locale object are finals, no need to have recursions deeper.
            // `localeObject = {"fr": string, "en": string}`
            if (isLocaleObject(dataStructure) && $routeParams.hasOwnProperty("localeId")) {
                if (dataStructure.hasOwnProperty($routeParams.localeId)) {
                    return dataStructure[$routeParams.localeId];
                }
            }

            // default case, where recursion is needed
            else {
                var object = {};
                for (var data in dataStructure){
                    if (dataStructure.hasOwnProperty(data)) {
                        var tmp = jsonResumeParser(dataStructure[data]); // to avoid to add obj.att = undefined
                        if (tmp !== undefined){
                            object[data] = tmp;
                        }
                    }
                }
                return object;
            }
        };
    }]);

// #    CONTROLLER  ------------------------------------------------------------------------

resumeApp.controller('resumeController', ['$scope', '$http', '$routeParams', 'resumeParser',
    function($scope, $http, $routeParams, resumeParser) {

        $scope.langId = $routeParams.localeId;
        $scope.cvId = $routeParams.resumeId;

        $http.get("resume/dataCV.json").success(function(data) {
            // Adapt the data to the `$routeParams`
            data = resumeParser(data);

            // Load general content
            $scope.heading	= {
                title: 		data.heading.titleResume,
                subheader: 	data.heading.qualities.join(", ")
            };

            $scope.sectionTitles = {
                skills: 	data.skills.sectionTitle,
                workExps: 	data.workExperience.sectionTitle,
                studies: 	data.studies.sectionTitle,
                others: 	data.others.sectionTitle
            };

            // Load Sections content
            $scope.identity = data.identity;
            $scope.workExps = data.workExperience.list;
            $scope.studies 	= data.studies.list;
            $scope.skills 	= data.skills.list;
            $scope.others 	= data.others.list;
            $scope.links    = data.links;
            $scope.pageContent  = data.pageContent;

        })
        .error(function(data, status, headers, config){
            console.log(data);
            console.log(status);
            console.log(headers);
            console.log(config);
        });

    }
]);