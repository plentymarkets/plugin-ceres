Vue.component("pagination", {

    template: "#vue-pagination",

    props: [
        "itemsPerPage"
    ],

    data: function()
    {
        return {
            itemList     : {},
            page         : 1
        };
    },

    created: function()
    {
    },

    ready: function()
    {
        // this.setDummyData();
    },

    methods:
    {
        setPage: function(page)
        {
            this.page = page;
        }

        // setDummyData: function()
        // {
        //     this.itemList = {
        //         events: [],
        //         data  : {
        //             page       : 1,
        //             totalsCount: 19,
        //             isLastPage : false,
        //             entries    : [
        //                 {
        //                     itemBase                       : {
        //                         id                 : 131,
        //                         rating             : 0,
        //                         ratingCount        : 0,
        //                         storeSpecial       : "3",
        //                         producer           : "Exclusive Leather",
        //                         producingCountryId : "1",
        //                         condition          : 0,
        //                         ageRestriction     : "0",
        //                         customsTariffNumber: ""
        //                     },
        //                     itemDescription                : {
        //                         name1           : "Zweisitzer Amsterdam at Dawn",
        //                         name2           : "",
        //                         name3           : "",
        //                         description     : "",
        //                         shortDescription: "",
        //                         technicalData   : "",
        //                         urlContent      : "wohnzimmer\/sofas\/zweisitzer-amsterdam-at-dawn"
        //                     },
        //                     variationBase                  : {
        //                         id               : 1029,
        //                         availability     : 1,
        //                         packingUnits     : 0,
        //                         content          : "1.000",
        //                         unitId           : 1,
        //                         model            : "",
        //                         variationName    : "",
        //                         customNumber     : "131",
        //                         externalId       : "",
        //                         weightG          : 0,
        //                         weightNetG       : 0,
        //                         widthMm          : 0,
        //                         heightMm         : 0,
        //                         lengthMm         : 0,
        //                         unitCombinationId: 1
        //                     },
        //                     variationImageList             : [
        //                         {
        //                             imageId            : 115,
        //                             type               : "internal",
        //                             fileType           : "jpeg",
        //                             path               : "documents\/image\/13\/131\/131-Zweisitzer-Amsterdam-at-Dawn-blau-0.jpg",
        //                             position           : 0,
        //                             lastUpdateTimestamp: "2016-09-29 10:11:17",
        //                             createTimestamp    : "2015-02-19 16:50:55",
        //                             cleanImageName     : "131-Zweisitzer-Amsterdam-at-Dawn-blau-0.jpg",
        //                             attributeValueId   : 0,
        //                             width              : 716,
        //                             height             : 557,
        //                             size               : 40842,
        //                             nameList           : []
        //                         },
        //                         {
        //                             imageId            : 116,
        //                             type               : "internal",
        //                             fileType           : "jpeg",
        //                             path               : "documents\/image\/13\/131\/131-Zweisitzer-Amsterdam-at-Dawn-schwarz-1.jpg",
        //                             position           : 1,
        //                             lastUpdateTimestamp: "2016-09-29 10:11:17",
        //                             createTimestamp    : "2015-02-19 16:50:56",
        //                             cleanImageName     : "131-Zweisitzer-Amsterdam-at-Dawn-schwarz-1.jpg",
        //                             attributeValueId   : 0,
        //                             width              : 716,
        //                             height             : 557,
        //                             size               : 34635,
        //                             nameList           : []
        //                         }
        //                     ],
        //                     variationRetailPrice           : {
        //                         priceId              : 1,
        //                         price                : 1900,
        //                         retailPrice          : 1900,
        //                         retailPriceNet       : 1596.6386554622,
        //                         basePrice            : 1900,
        //                         basePriceNet         : 1596.6386554622,
        //                         unitPrice            : 1900,
        //                         unitPriceNet         : 1596.6386554622,
        //                         orderParamsMarkup    : 0,
        //                         orderParamsMarkupNet : 0,
        //                         classRebatePercent   : 0,
        //                         classRebate          : 0,
        //                         classRebateNet       : 0,
        //                         categoryRebatePercent: 0,
        //                         categoryRebate       : 0,
        //                         categoryRebateNet    : 0,
        //                         vatId                : 0,
        //                         vatValue             : 19,
        //                         currency             : "EUR",
        //                         exchangeRatio        : 1,
        //                         minimumOrderQuantity : "1.00",
        //                         lastUpdateTimestamp  : "2016-09-05 13:25:20"
        //                     },
        //                     priceData: {
        //                         priceId             : 2,
        //                         price               : 0,
        //                         retailPrice         : 0,
        //                         retailPriceNet      : 0,
        //                         basePrice           : 0,
        //                         basePriceNet        : 0,
        //                         unitPrice           : 0,
        //                         unitPriceNet        : 0,
        //                         orderParamsMarkup   : 0,
        //                         orderParamsMarkupNet: 0,
        //                         vatId               : 0,
        //                         vatValue            : 19,
        //                         currency            : "EUR",
        //                         exchangeRatio       : 1,
        //                         minimumOrderQuantity: "0.00",
        //                         lastUpdateTimestamp : "2016-09-05 13:25:20"
        //                     },
        //                     variationStandardCategory      : {
        //                         categoryId: 18
        //                     }
        //                 },
        //                 {
        //                     itemBase                       : {
        //                         id                 : 131,
        //                         rating             : 0,
        //                         ratingCount        : 0,
        //                         storeSpecial       : "3",
        //                         producer           : "Exclusive Leather",
        //                         producingCountryId : "1",
        //                         condition          : 0,
        //                         ageRestriction     : "0",
        //                         customsTariffNumber: ""
        //                     },
        //                     itemDescription                : {
        //                         name1           : "Zweisitzer Amsterdam at Dawn",
        //                         name2           : "",
        //                         name3           : "",
        //                         description     : "",
        //                         shortDescription: "",
        //                         technicalData   : "",
        //                         urlContent      : "wohnzimmer\/sofas\/zweisitzer-amsterdam-at-dawn"
        //                     },
        //                     variationBase                  : {
        //                         id               : 1063,
        //                         availability     : 1,
        //                         packingUnits     : 0,
        //                         content          : "1.000",
        //                         unitId           : 1,
        //                         model            : "",
        //                         variationName    : "",
        //                         customNumber     : "131-black",
        //                         externalId       : "",
        //                         weightG          : 0,
        //                         weightNetG       : 0,
        //                         widthMm          : 0,
        //                         heightMm         : 0,
        //                         lengthMm         : 0,
        //                         unitCombinationId: 1
        //                     },
        //                     variationImageList             : [
        //                         {
        //                             imageId            : 115,
        //                             type               : "internal",
        //                             fileType           : "jpeg",
        //                             path               : "documents\/image\/13\/131\/131-Zweisitzer-Amsterdam-at-Dawn-blau-0.jpg",
        //                             position           : 0,
        //                             lastUpdateTimestamp: "2016-09-29 10:11:17",
        //                             createTimestamp    : "2015-02-19 16:50:55",
        //                             cleanImageName     : "131-Zweisitzer-Amsterdam-at-Dawn-blau-0.jpg",
        //                             attributeValueId   : 0,
        //                             width              : 716,
        //                             height             : 557,
        //                             size               : 40842,
        //                             nameList           : []
        //                         },
        //                         {
        //                             imageId            : 116,
        //                             type               : "internal",
        //                             fileType           : "jpeg",
        //                             path               : "documents\/image\/13\/131\/131-Zweisitzer-Amsterdam-at-Dawn-schwarz-1.jpg",
        //                             position           : 1,
        //                             lastUpdateTimestamp: "2016-09-29 10:11:17",
        //                             createTimestamp    : "2015-02-19 16:50:56",
        //                             cleanImageName     : "131-Zweisitzer-Amsterdam-at-Dawn-schwarz-1.jpg",
        //                             attributeValueId   : 0,
        //                             width              : 716,
        //                             height             : 557,
        //                             size               : 34635,
        //                             nameList           : []
        //                         }
        //                     ],
        //                     variationRetailPrice           : {
        //                         priceId              : 1,
        //                         price                : 1900,
        //                         retailPrice          : 1900,
        //                         retailPriceNet       : 1596.6386554622,
        //                         basePrice            : 1900,
        //                         basePriceNet         : 1596.6386554622,
        //                         unitPrice            : 1900,
        //                         unitPriceNet         : 1596.6386554622,
        //                         orderParamsMarkup    : 0,
        //                         orderParamsMarkupNet : 0,
        //                         classRebatePercent   : 0,
        //                         classRebate          : 0,
        //                         classRebateNet       : 0,
        //                         categoryRebatePercent: 0,
        //                         categoryRebate       : 0,
        //                         categoryRebateNet    : 0,
        //                         vatId                : 0,
        //                         vatValue             : 19,
        //                         currency             : "EUR",
        //                         exchangeRatio        : 1,
        //                         minimumOrderQuantity : "1.00",
        //                         lastUpdateTimestamp  : "2016-09-05 13:25:20"
        //                     },
        //                     priceData: {
        //                         priceId             : 2,
        //                         price               : 0,
        //                         retailPrice         : 0,
        //                         retailPriceNet      : 0,
        //                         basePrice           : 0,
        //                         basePriceNet        : 0,
        //                         unitPrice           : 0,
        //                         unitPriceNet        : 0,
        //                         orderParamsMarkup   : 0,
        //                         orderParamsMarkupNet: 0,
        //                         vatId               : 0,
        //                         vatValue            : 19,
        //                         currency            : "EUR",
        //                         exchangeRatio       : 1,
        //                         minimumOrderQuantity: "0.00",
        //                         lastUpdateTimestamp : "2016-09-05 13:25:20"
        //                     },
        //                     variationStandardCategory      : {
        //                         categoryId: 18
        //                     }
        //                 },
        //                 {
        //                     itemBase                       : {
        //                         id                 : 131,
        //                         rating             : 0,
        //                         ratingCount        : 0,
        //                         storeSpecial       : "3",
        //                         producer           : "Exclusive Leather",
        //                         producingCountryId : "1",
        //                         condition          : 0,
        //                         ageRestriction     : "0",
        //                         customsTariffNumber: ""
        //                     },
        //                     itemDescription                : {
        //                         name1           : "Zweisitzer Amsterdam at Dawn",
        //                         name2           : "",
        //                         name3           : "",
        //                         description     : "",
        //                         shortDescription: "",
        //                         technicalData   : "",
        //                         urlContent      : "wohnzimmer\/sofas\/zweisitzer-amsterdam-at-dawn"
        //                     },
        //                     variationBase                  : {
        //                         id               : 1064,
        //                         availability     : 2,
        //                         packingUnits     : 0,
        //                         content          : "1.000",
        //                         unitId           : 1,
        //                         model            : "",
        //                         variationName    : "",
        //                         customNumber     : "131-purple",
        //                         externalId       : "",
        //                         weightG          : 0,
        //                         weightNetG       : 0,
        //                         widthMm          : 0,
        //                         heightMm         : 0,
        //                         lengthMm         : 0,
        //                         unitCombinationId: 1
        //                     },
        //                     variationImageList             : [
        //                         {
        //                             imageId            : 115,
        //                             type               : "internal",
        //                             fileType           : "jpeg",
        //                             path               : "documents\/image\/13\/131\/131-Zweisitzer-Amsterdam-at-Dawn-blau-0.jpg",
        //                             position           : 0,
        //                             lastUpdateTimestamp: "2016-09-29 10:11:17",
        //                             createTimestamp    : "2015-02-19 16:50:55",
        //                             cleanImageName     : "131-Zweisitzer-Amsterdam-at-Dawn-blau-0.jpg",
        //                             attributeValueId   : 0,
        //                             width              : 716,
        //                             height             : 557,
        //                             size               : 40842,
        //                             nameList           : []
        //                         },
        //                         {
        //                             imageId            : 116,
        //                             type               : "internal",
        //                             fileType           : "jpeg",
        //                             path               : "documents\/image\/13\/131\/131-Zweisitzer-Amsterdam-at-Dawn-schwarz-1.jpg",
        //                             position           : 1,
        //                             lastUpdateTimestamp: "2016-09-29 10:11:17",
        //                             createTimestamp    : "2015-02-19 16:50:56",
        //                             cleanImageName     : "131-Zweisitzer-Amsterdam-at-Dawn-schwarz-1.jpg",
        //                             attributeValueId   : 0,
        //                             width              : 716,
        //                             height             : 557,
        //                             size               : 34635,
        //                             nameList           : []
        //                         }
        //                     ],
        //                     variationRetailPrice           : {
        //                         priceId              : 1,
        //                         price                : 1900,
        //                         retailPrice          : 1900,
        //                         retailPriceNet       : 1596.6386554622,
        //                         basePrice            : 1900,
        //                         basePriceNet         : 1596.6386554622,
        //                         unitPrice            : 1900,
        //                         unitPriceNet         : 1596.6386554622,
        //                         orderParamsMarkup    : 0,
        //                         orderParamsMarkupNet : 0,
        //                         classRebatePercent   : 0,
        //                         classRebate          : 0,
        //                         classRebateNet       : 0,
        //                         categoryRebatePercent: 0,
        //                         categoryRebate       : 0,
        //                         categoryRebateNet    : 0,
        //                         vatId                : 0,
        //                         vatValue             : 19,
        //                         currency             : "EUR",
        //                         exchangeRatio        : 1,
        //                         minimumOrderQuantity : "1.00",
        //                         lastUpdateTimestamp  : "2016-09-05 13:25:20"
        //                     },
        //                     priceData: {
        //                         priceId             : 2,
        //                         price               : 0,
        //                         retailPrice         : 0,
        //                         retailPriceNet      : 0,
        //                         basePrice           : 0,
        //                         basePriceNet        : 0,
        //                         unitPrice           : 0,
        //                         unitPriceNet        : 0,
        //                         orderParamsMarkup   : 0,
        //                         orderParamsMarkupNet: 0,
        //                         vatId               : 0,
        //                         vatValue            : 19,
        //                         currency            : "EUR",
        //                         exchangeRatio       : 1,
        //                         minimumOrderQuantity: "0.00",
        //                         lastUpdateTimestamp : "2016-09-05 13:25:20"
        //                     },
        //                     variationStandardCategory      : {
        //                         categoryId: 18
        //                     }
        //                 },
        //                 {
        //                     itemBase                       : {
        //                         id                 : 128,
        //                         rating             : 0,
        //                         ratingCount        : 0,
        //                         storeSpecial       : "0",
        //                         producer           : "A & C Design",
        //                         producingCountryId : "1",
        //                         condition          : 0,
        //                         ageRestriction     : "0",
        //                         customsTariffNumber: ""
        //                     },
        //                     itemDescription                : {
        //                         name1           : "Sofa Creme Classicline",
        //                         name2           : "",
        //                         name3           : "",
        //                         description     : "",
        //                         shortDescription: "",
        //                         technicalData   : "",
        //                         urlContent      : "wohnzimmer\/sofas\/sofa-creme-classicline"
        //                     },
        //                     variationBase                  : {
        //                         id               : 1026,
        //                         availability     : 1,
        //                         packingUnits     : 0,
        //                         content          : "1.000",
        //                         unitId           : 1,
        //                         model            : "",
        //                         variationName    : "",
        //                         customNumber     : "122",
        //                         externalId       : "",
        //                         weightG          : 0,
        //                         weightNetG       : 0,
        //                         widthMm          : 0,
        //                         heightMm         : 0,
        //                         lengthMm         : 0,
        //                         unitCombinationId: 1
        //                     },
        //                     variationImageList             : [
        //                         {
        //                             imageId            : 110,
        //                             type               : "internal",
        //                             fileType           : "jpeg",
        //                             path               : "documents\/image\/12\/128\/128-Sofa-Creme-Classicline-0.jpg",
        //                             position           : 0,
        //                             lastUpdateTimestamp: "2016-09-29 10:11:17",
        //                             createTimestamp    : "2015-02-19 16:50:53",
        //                             cleanImageName     : "128-Sofa-Creme-Classicline-0.jpg",
        //                             attributeValueId   : 0,
        //                             width              : 800,
        //                             height             : 394,
        //                             size               : 39878,
        //                             nameList           : []
        //                         }
        //                     ],
        //                     variationRetailPrice           : {
        //                         priceId              : 1,
        //                         price                : 269,
        //                         retailPrice          : 269,
        //                         retailPriceNet       : 226.05042016807,
        //                         basePrice            : 269,
        //                         basePriceNet         : 226.05042016807,
        //                         unitPrice            : 269,
        //                         unitPriceNet         : 226.05042016807,
        //                         orderParamsMarkup    : 0,
        //                         orderParamsMarkupNet : 0,
        //                         classRebatePercent   : 0,
        //                         classRebate          : 0,
        //                         classRebateNet       : 0,
        //                         categoryRebatePercent: 0,
        //                         categoryRebate       : 0,
        //                         categoryRebateNet    : 0,
        //                         vatId                : 0,
        //                         vatValue             : 19,
        //                         currency             : "EUR",
        //                         exchangeRatio        : 1,
        //                         minimumOrderQuantity : "1.00",
        //                         lastUpdateTimestamp  : "2016-09-05 13:25:20"
        //                     },
        //                     priceData: {
        //                         priceId             : 2,
        //                         price               : 280,
        //                         retailPrice         : 280,
        //                         retailPriceNet      : 235.29411764706,
        //                         basePrice           : 280,
        //                         basePriceNet        : 235.29411764706,
        //                         unitPrice           : 280,
        //                         unitPriceNet        : 235.29411764706,
        //                         orderParamsMarkup   : 0,
        //                         orderParamsMarkupNet: 0,
        //                         vatId               : 0,
        //                         vatValue            : 19,
        //                         currency            : "EUR",
        //                         exchangeRatio       : 1,
        //                         minimumOrderQuantity: "0.00",
        //                         lastUpdateTimestamp : "2016-09-05 13:25:20"
        //                     },
        //                     variationStandardCategory      : {
        //                         categoryId: 18
        //                     }
        //                 },
        //                 {
        //                     itemBase                       : {
        //                         id                 : 127,
        //                         rating             : 0,
        //                         ratingCount        : 0,
        //                         storeSpecial       : "2",
        //                         producer           : "A & C Design",
        //                         producingCountryId : "1",
        //                         condition          : 0,
        //                         ageRestriction     : "0",
        //                         customsTariffNumber: ""
        //                     },
        //                     itemDescription                : {
        //                         name1           : "Sofa 2-Sitzer Sunflower",
        //                         name2           : "",
        //                         name3           : "",
        //                         description     : "",
        //                         shortDescription: "",
        //                         technicalData   : "",
        //                         urlContent      : "wohnzimmer\/sessel-sofas\/sofa-2-sitzer-sunflower"
        //                     },
        //                     variationBase                  : {
        //                         id               : 1025,
        //                         availability     : 1,
        //                         packingUnits     : 0,
        //                         content          : "1.000",
        //                         unitId           : 1,
        //                         model            : "",
        //                         variationName    : "",
        //                         customNumber     : "121",
        //                         externalId       : "",
        //                         weightG          : 0,
        //                         weightNetG       : 0,
        //                         widthMm          : 0,
        //                         heightMm         : 0,
        //                         lengthMm         : 0,
        //                         unitCombinationId: 1
        //                     },
        //                     variationImageList             : [
        //                         {
        //                             imageId            : 109,
        //                             type               : "internal",
        //                             fileType           : "jpeg",
        //                             path               : "documents\/image\/12\/127\/127-Sofa-2-Sitzer-Sunflower-0.jpg",
        //                             position           : 0,
        //                             lastUpdateTimestamp: "2016-09-29 10:11:17",
        //                             createTimestamp    : "2015-02-19 16:50:52",
        //                             cleanImageName     : "127-Sofa-2-Sitzer-Sunflower-0.jpg",
        //                             attributeValueId   : 0,
        //                             width              : 800,
        //                             height             : 532,
        //                             size               : 43242,
        //                             nameList           : []
        //                         }
        //                     ],
        //                     variationRetailPrice           : {
        //                         priceId              : 1,
        //                         price                : 335,
        //                         retailPrice          : 335,
        //                         retailPriceNet       : 281.51260504202,
        //                         basePrice            : 335,
        //                         basePriceNet         : 281.51260504202,
        //                         unitPrice            : 335,
        //                         unitPriceNet         : 281.51260504202,
        //                         orderParamsMarkup    : 0,
        //                         orderParamsMarkupNet : 0,
        //                         classRebatePercent   : 0,
        //                         classRebate          : 0,
        //                         classRebateNet       : 0,
        //                         categoryRebatePercent: 0,
        //                         categoryRebate       : 0,
        //                         categoryRebateNet    : 0,
        //                         vatId                : 0,
        //                         vatValue             : 19,
        //                         currency             : "EUR",
        //                         exchangeRatio        : 1,
        //                         minimumOrderQuantity : "1.00",
        //                         lastUpdateTimestamp  : "2016-09-05 13:25:20"
        //                     },
        //                     priceData: {
        //                         priceId             : 2,
        //                         price               : 345,
        //                         retailPrice         : 345,
        //                         retailPriceNet      : 289.91596638655,
        //                         basePrice           : 345,
        //                         basePriceNet        : 289.91596638655,
        //                         unitPrice           : 345,
        //                         unitPriceNet        : 289.91596638655,
        //                         orderParamsMarkup   : 0,
        //                         orderParamsMarkupNet: 0,
        //                         vatId               : 0,
        //                         vatValue            : 19,
        //                         currency            : "EUR",
        //                         exchangeRatio       : 1,
        //                         minimumOrderQuantity: "0.00",
        //                         lastUpdateTimestamp : "2016-09-05 13:25:20"
        //                     },
        //                     variationStandardCategory      : {
        //                         categoryId: 18
        //                     }
        //                 },
        //                 {
        //                     itemBase                       : {
        //                         id                 : 104,
        //                         rating             : 0,
        //                         ratingCount        : 0,
        //                         storeSpecial       : "0",
        //                         producer           : "Exclusive Leather",
        //                         producingCountryId : "1",
        //                         condition          : 0,
        //                         ageRestriction     : "0",
        //                         customsTariffNumber: ""
        //                     },
        //                     itemDescription                : {
        //                         name1           : "Leder-Sofa \u00bbSan Jose\u00ab braun",
        //                         name2           : "",
        //                         name3           : "",
        //                         description     : "",
        //                         shortDescription: "Edles Polsterm\u00f6bel aus Echtleder",
        //                         technicalData   : "",
        //                         urlContent      : "wohnzimmer\/sessel-sofas\/sofa-echtleder-san-jose-braun"
        //                     },
        //                     variationBase                  : {
        //                         id               : 1002,
        //                         availability     : 1,
        //                         packingUnits     : 1,
        //                         content          : "1.000",
        //                         unitId           : 1,
        //                         model            : "",
        //                         variationName    : "",
        //                         customNumber     : "WSO-00431-B",
        //                         externalId       : "",
        //                         weightG          : 0,
        //                         weightNetG       : 0,
        //                         widthMm          : 0,
        //                         heightMm         : 0,
        //                         lengthMm         : 0,
        //                         unitCombinationId: 1
        //                     },
        //                     variationImageList             : [
        //                         {
        //                             imageId            : 85,
        //                             type               : "internal",
        //                             fileType           : "jpeg",
        //                             path               : "documents\/image\/10\/104\/104-couche-leder-braun-1-0.jpg",
        //                             position           : 0,
        //                             lastUpdateTimestamp: "2016-09-29 10:11:17",
        //                             createTimestamp    : "2015-02-19 16:50:38",
        //                             cleanImageName     : "104-couche-leder-braun-1-0.jpg",
        //                             attributeValueId   : 0,
        //                             width              : 800,
        //                             height             : 452,
        //                             size               : 41450,
        //                             nameList           : []
        //                         },
        //                         {
        //                             imageId            : 86,
        //                             type               : "internal",
        //                             fileType           : "jpeg",
        //                             path               : "documents\/image\/10\/104\/104-couche-leder-braun-2-1.jpg",
        //                             position           : 1,
        //                             lastUpdateTimestamp: "2016-09-29 10:11:17",
        //                             createTimestamp    : "2015-02-19 16:50:38",
        //                             cleanImageName     : "104-couche-leder-braun-2-1.jpg",
        //                             attributeValueId   : 0,
        //                             width              : 733,
        //                             height             : 549,
        //                             size               : 44280,
        //                             nameList           : []
        //                         }
        //                     ],
        //                     variationRetailPrice           : {
        //                         priceId              : 1,
        //                         price                : 639,
        //                         retailPrice          : 639,
        //                         retailPriceNet       : 536.97478991597,
        //                         basePrice            : 639,
        //                         basePriceNet         : 536.97478991597,
        //                         unitPrice            : 639,
        //                         unitPriceNet         : 536.97478991597,
        //                         orderParamsMarkup    : 0,
        //                         orderParamsMarkupNet : 0,
        //                         classRebatePercent   : 0,
        //                         classRebate          : 0,
        //                         classRebateNet       : 0,
        //                         categoryRebatePercent: 0,
        //                         categoryRebate       : 0,
        //                         categoryRebateNet    : 0,
        //                         vatId                : 0,
        //                         vatValue             : 19,
        //                         currency             : "EUR",
        //                         exchangeRatio        : 1,
        //                         minimumOrderQuantity : "1.00",
        //                         lastUpdateTimestamp  : "2016-09-05 13:25:20"
        //                     },
        //                     priceData: {
        //                         priceId             : 2,
        //                         price               : 710,
        //                         retailPrice         : 710,
        //                         retailPriceNet      : 596.63865546218,
        //                         basePrice           : 710,
        //                         basePriceNet        : 596.63865546218,
        //                         unitPrice           : 710,
        //                         unitPriceNet        : 596.63865546218,
        //                         orderParamsMarkup   : 0,
        //                         orderParamsMarkupNet: 0,
        //                         vatId               : 0,
        //                         vatValue            : 19,
        //                         currency            : "EUR",
        //                         exchangeRatio       : 1,
        //                         minimumOrderQuantity: "0.00",
        //                         lastUpdateTimestamp : "2016-09-05 13:25:20"
        //                     },
        //                     variationStandardCategory      : {
        //                         categoryId: 18
        //                     }
        //                 },
        //                 {
        //                     itemBase                       : {
        //                         id                 : 134,
        //                         rating             : 0,
        //                         ratingCount        : 0,
        //                         storeSpecial       : "0",
        //                         producer           : "A & C Design",
        //                         producingCountryId : "1",
        //                         condition          : 0,
        //                         ageRestriction     : "0",
        //                         customsTariffNumber: ""
        //                     },
        //                     itemDescription                : {
        //                         name1           : "Couch Purple Dreams",
        //                         name2           : "",
        //                         name3           : "",
        //                         description     : "Ob gem\u00fctlicher Fernsehabend oder Kaffeeklatsch mit den besten Freundinnen \u2013 mit der Couch Purple Dreams wird\u2019s auf jeden Fall gem\u00fctlich. Sie bietet jede Menge Platz und Komfort und setzt dank der originellen Farbgestaltung auch visuell interessante Akzente. Der Baumwollbezug ist besonders strapazierf\u00e4hig, die Standf\u00fc\u00dfe in edler Holzoptik sorgen f\u00fcr festen Stand.\n",
        //                         shortDescription: "",
        //                         technicalData   : "",
        //                         urlContent      : "wohnzimmer\/sofas\/couch-purple-dreams"
        //                     },
        //                     variationBase                  : {
        //                         id               : 1032,
        //                         availability     : 1,
        //                         packingUnits     : 0,
        //                         content          : "1.000",
        //                         unitId           : 1,
        //                         model            : "",
        //                         variationName    : "",
        //                         customNumber     : "128",
        //                         externalId       : "",
        //                         weightG          : 0,
        //                         weightNetG       : 0,
        //                         widthMm          : 0,
        //                         heightMm         : 0,
        //                         lengthMm         : 0,
        //                         unitCombinationId: 1
        //                     },
        //                     variationImageList             : [
        //                         {
        //                             imageId            : 121,
        //                             type               : "internal",
        //                             fileType           : "jpeg",
        //                             path               : "documents\/image\/13\/134\/134-Couch-Purple-Dreams-0.jpg",
        //                             position           : 0,
        //                             lastUpdateTimestamp: "2016-09-29 10:11:17",
        //                             createTimestamp    : "2015-02-19 16:50:59",
        //                             cleanImageName     : "134-Couch-Purple-Dreams-0.jpg",
        //                             attributeValueId   : 0,
        //                             width              : 800,
        //                             height             : 399,
        //                             size               : 40839,
        //                             nameList           : []
        //                         }
        //                     ],
        //                     variationRetailPrice           : {
        //                         priceId              : 1,
        //                         price                : 890,
        //                         retailPrice          : 890,
        //                         retailPriceNet       : 747.89915966387,
        //                         basePrice            : 890,
        //                         basePriceNet         : 747.89915966387,
        //                         unitPrice            : 890,
        //                         unitPriceNet         : 747.89915966387,
        //                         orderParamsMarkup    : 0,
        //                         orderParamsMarkupNet : 0,
        //                         classRebatePercent   : 0,
        //                         classRebate          : 0,
        //                         classRebateNet       : 0,
        //                         categoryRebatePercent: 0,
        //                         categoryRebate       : 0,
        //                         categoryRebateNet    : 0,
        //                         vatId                : 0,
        //                         vatValue             : 19,
        //                         currency             : "EUR",
        //                         exchangeRatio        : 1,
        //                         minimumOrderQuantity : "1.00",
        //                         lastUpdateTimestamp  : "2016-09-05 13:25:20"
        //                     },
        //                     priceData: {
        //                         priceId             : 2,
        //                         price               : 0,
        //                         retailPrice         : 0,
        //                         retailPriceNet      : 0,
        //                         basePrice           : 0,
        //                         basePriceNet        : 0,
        //                         unitPrice           : 0,
        //                         unitPriceNet        : 0,
        //                         orderParamsMarkup   : 0,
        //                         orderParamsMarkupNet: 0,
        //                         vatId               : 0,
        //                         vatValue            : 19,
        //                         currency            : "EUR",
        //                         exchangeRatio       : 1,
        //                         minimumOrderQuantity: "0.00",
        //                         lastUpdateTimestamp : "2016-09-05 13:25:20"
        //                     },
        //                     variationStandardCategory      : {
        //                         categoryId: 18
        //                     }
        //                 },
        //                 {
        //                     itemBase                       : {
        //                         id                 : 135,
        //                         rating             : 0,
        //                         ratingCount        : 0,
        //                         storeSpecial       : "0",
        //                         producer           : "A & C Design",
        //                         producingCountryId : "1",
        //                         condition          : 0,
        //                         ageRestriction     : "0",
        //                         customsTariffNumber: ""
        //                     },
        //                     itemDescription                : {
        //                         name1           : "Zweisitzer Red Carpet",
        //                         name2           : "",
        //                         name3           : "",
        //                         description     : "Der Zweisitzer Red Carpet besticht durch klassisches und dennoch originelles Design. Das leuchtende Rot macht ihn in jedem Wohnzimmer zum Statement Piece. Die klassische Form ist absolut zeitlos. Das gl\u00e4nzende Kunstleder ist besonders strapazierf\u00e4hig und kann bei Bedarf mit einem feuchten Tuch abgewischt werden.\n",
        //                         shortDescription: "",
        //                         technicalData   : "",
        //                         urlContent      : "wohnzimmer\/sofas\/zweisitzer-red-carpet"
        //                     },
        //                     variationBase                  : {
        //                         id               : 1033,
        //                         availability     : 1,
        //                         packingUnits     : 0,
        //                         content          : "1.000",
        //                         unitId           : 1,
        //                         model            : "",
        //                         variationName    : "",
        //                         customNumber     : "129",
        //                         externalId       : "",
        //                         weightG          : 0,
        //                         weightNetG       : 0,
        //                         widthMm          : 0,
        //                         heightMm         : 0,
        //                         lengthMm         : 0,
        //                         unitCombinationId: 1
        //                     },
        //                     variationImageList             : [
        //                         {
        //                             imageId            : 122,
        //                             type               : "internal",
        //                             fileType           : "jpeg",
        //                             path               : "documents\/image\/13\/135\/135-Zweisitzer-Red-Carpet-0.jpg",
        //                             position           : 0,
        //                             lastUpdateTimestamp: "2016-09-29 10:11:17",
        //                             createTimestamp    : "2015-02-19 16:50:59",
        //                             cleanImageName     : "135-Zweisitzer-Red-Carpet-0.jpg",
        //                             attributeValueId   : 0,
        //                             width              : 800,
        //                             height             : 532,
        //                             size               : 40065,
        //                             nameList           : []
        //                         }
        //                     ],
        //                     variationRetailPrice           : {
        //                         priceId              : 1,
        //                         price                : 730,
        //                         retailPrice          : 730,
        //                         retailPriceNet       : 613.44537815126,
        //                         basePrice            : 730,
        //                         basePriceNet         : 613.44537815126,
        //                         unitPrice            : 730,
        //                         unitPriceNet         : 613.44537815126,
        //                         orderParamsMarkup    : 0,
        //                         orderParamsMarkupNet : 0,
        //                         classRebatePercent   : 0,
        //                         classRebate          : 0,
        //                         classRebateNet       : 0,
        //                         categoryRebatePercent: 0,
        //                         categoryRebate       : 0,
        //                         categoryRebateNet    : 0,
        //                         vatId                : 0,
        //                         vatValue             : 19,
        //                         currency             : "EUR",
        //                         exchangeRatio        : 1,
        //                         minimumOrderQuantity : "1.00",
        //                         lastUpdateTimestamp  : "2016-09-05 13:25:20"
        //                     },
        //                     priceData: {
        //                         priceId             : 2,
        //                         price               : 0,
        //                         retailPrice         : 0,
        //                         retailPriceNet      : 0,
        //                         basePrice           : 0,
        //                         basePriceNet        : 0,
        //                         unitPrice           : 0,
        //                         unitPriceNet        : 0,
        //                         orderParamsMarkup   : 0,
        //                         orderParamsMarkupNet: 0,
        //                         vatId               : 0,
        //                         vatValue            : 19,
        //                         currency            : "EUR",
        //                         exchangeRatio       : 1,
        //                         minimumOrderQuantity: "0.00",
        //                         lastUpdateTimestamp : "2016-09-05 13:25:20"
        //                     },
        //                     variationStandardCategory      : {
        //                         categoryId: 18
        //                     }
        //                 },
        //                 {
        //                     itemBase                       : {
        //                         id                 : 133,
        //                         rating             : 0,
        //                         ratingCount        : 0,
        //                         storeSpecial       : "2",
        //                         producer           : "Exclusive Leather",
        //                         producingCountryId : "1",
        //                         condition          : 0,
        //                         ageRestriction     : "0",
        //                         customsTariffNumber: ""
        //                     },
        //                     itemDescription                : {
        //                         name1           : "Zweisitzer White Russian",
        //                         name2           : "",
        //                         name3           : "",
        //                         description     : "",
        //                         shortDescription: "",
        //                         technicalData   : "",
        //                         urlContent      : "wohnzimmer\/sofas\/zweisitzer-white-russian"
        //                     },
        //                     variationBase                  : {
        //                         id               : 1031,
        //                         availability     : 1,
        //                         packingUnits     : 0,
        //                         content          : "1.000",
        //                         unitId           : 1,
        //                         model            : "",
        //                         variationName    : "",
        //                         customNumber     : "127",
        //                         externalId       : "",
        //                         weightG          : 0,
        //                         weightNetG       : 0,
        //                         widthMm          : 0,
        //                         heightMm         : 0,
        //                         lengthMm         : 0,
        //                         unitCombinationId: 1
        //                     },
        //                     variationImageList             : [
        //                         {
        //                             imageId            : 119,
        //                             type               : "internal",
        //                             fileType           : "jpeg",
        //                             path               : "documents\/image\/13\/133\/133-Zweisitzer-White-Russian-1-0.jpg",
        //                             position           : 0,
        //                             lastUpdateTimestamp: "2016-09-29 10:11:17",
        //                             createTimestamp    : "2015-02-19 16:50:58",
        //                             cleanImageName     : "133-Zweisitzer-White-Russian-1-0.jpg",
        //                             attributeValueId   : 0,
        //                             width              : 800,
        //                             height             : 499,
        //                             size               : 26621,
        //                             nameList           : []
        //                         },
        //                         {
        //                             imageId            : 120,
        //                             type               : "internal",
        //                             fileType           : "jpeg",
        //                             path               : "documents\/image\/13\/133\/133-Zweisitzer-White-Russian-2-1.jpg",
        //                             position           : 1,
        //                             lastUpdateTimestamp: "2016-09-29 10:11:17",
        //                             createTimestamp    : "2015-02-19 16:50:58",
        //                             cleanImageName     : "133-Zweisitzer-White-Russian-2-1.jpg",
        //                             attributeValueId   : 0,
        //                             width              : 800,
        //                             height             : 499,
        //                             size               : 23410,
        //                             nameList           : []
        //                         }
        //                     ],
        //                     variationRetailPrice           : {
        //                         priceId              : 1,
        //                         price                : 2300,
        //                         retailPrice          : 2300,
        //                         retailPriceNet       : 1932.7731092437,
        //                         basePrice            : 2300,
        //                         basePriceNet         : 1932.7731092437,
        //                         unitPrice            : 2300,
        //                         unitPriceNet         : 1932.7731092437,
        //                         orderParamsMarkup    : 0,
        //                         orderParamsMarkupNet : 0,
        //                         classRebatePercent   : 0,
        //                         classRebate          : 0,
        //                         classRebateNet       : 0,
        //                         categoryRebatePercent: 0,
        //                         categoryRebate       : 0,
        //                         categoryRebateNet    : 0,
        //                         vatId                : 0,
        //                         vatValue             : 19,
        //                         currency             : "EUR",
        //                         exchangeRatio        : 1,
        //                         minimumOrderQuantity : "1.00",
        //                         lastUpdateTimestamp  : "2016-09-05 13:25:20"
        //                     },
        //                     priceData: {
        //                         priceId             : 2,
        //                         price               : 0,
        //                         retailPrice         : 0,
        //                         retailPriceNet      : 0,
        //                         basePrice           : 0,
        //                         basePriceNet        : 0,
        //                         unitPrice           : 0,
        //                         unitPriceNet        : 0,
        //                         orderParamsMarkup   : 0,
        //                         orderParamsMarkupNet: 0,
        //                         vatId               : 0,
        //                         vatValue            : 19,
        //                         currency            : "EUR",
        //                         exchangeRatio       : 1,
        //                         minimumOrderQuantity: "0.00",
        //                         lastUpdateTimestamp : "2016-09-05 13:25:20"
        //                     },
        //                     variationStandardCategory      : {
        //                         categoryId: 18
        //                     }
        //                 },
        //                 {
        //                     itemBase                       : {
        //                         id                 : 132,
        //                         rating             : 0,
        //                         ratingCount        : 0,
        //                         storeSpecial       : "1",
        //                         producer           : "Exclusive Leather",
        //                         producingCountryId : "1",
        //                         condition          : 0,
        //                         ageRestriction     : "0",
        //                         customsTariffNumber: ""
        //                     },
        //                     itemDescription                : {
        //                         name1           : "Zweisitzer Paradise Now",
        //                         name2           : "",
        //                         name3           : "",
        //                         description     : "Der Zweisitzer Paradise Now kommt in schlichter und doch edler Optik daher. Das klassische Design mit moderner Silhouette macht in jedem Wohnzimmer eine gute Figur. Dank abwaschbarem und \u00e4u\u00dferst strapazierf\u00e4higem Glattleder k\u00f6nnen auch zum Beispiel schmutzige Kinderh\u00e4nde keinen dauerhaften Schaden anrichten. Standf\u00fc\u00dfe aus Echtholz setzen warme, interessante Akzente.\n",
        //                         shortDescription: "",
        //                         technicalData   : "",
        //                         urlContent      : "wohnzimmer\/sofas\/zweisitzer-paradise-now"
        //                     },
        //                     variationBase                  : {
        //                         id               : 1030,
        //                         availability     : 1,
        //                         packingUnits     : 0,
        //                         content          : "1.000",
        //                         unitId           : 1,
        //                         model            : "",
        //                         variationName    : "",
        //                         customNumber     : "132",
        //                         externalId       : "",
        //                         weightG          : 0,
        //                         weightNetG       : 0,
        //                         widthMm          : 0,
        //                         heightMm         : 0,
        //                         lengthMm         : 0,
        //                         unitCombinationId: 1
        //                     },
        //                     variationImageList             : [
        //                         {
        //                             imageId            : 117,
        //                             type               : "internal",
        //                             fileType           : "jpeg",
        //                             path               : "documents\/image\/13\/132\/132-Zweisitzer-Paradise-Now-rot-0.jpg",
        //                             position           : 0,
        //                             lastUpdateTimestamp: "2016-09-29 10:11:17",
        //                             createTimestamp    : "2015-02-19 16:50:57",
        //                             cleanImageName     : "132-Zweisitzer-Paradise-Now-rot-0.jpg",
        //                             attributeValueId   : 0,
        //                             width              : 800,
        //                             height             : 537,
        //                             size               : 33005,
        //                             nameList           : []
        //                         },
        //                         {
        //                             imageId            : 118,
        //                             type               : "internal",
        //                             fileType           : "jpeg",
        //                             path               : "documents\/image\/13\/132\/132-Zweisitzer-Paradise-Now-wei---1.jpg",
        //                             position           : 1,
        //                             lastUpdateTimestamp: "2016-09-29 10:11:17",
        //                             createTimestamp    : "2015-02-19 16:50:57",
        //                             cleanImageName     : "132-Zweisitzer-Paradise-Now-wei---1.jpg",
        //                             attributeValueId   : 0,
        //                             width              : 800,
        //                             height             : 537,
        //                             size               : 30111,
        //                             nameList           : []
        //                         }
        //                     ],
        //                     variationRetailPrice           : {
        //                         priceId              : 1,
        //                         price                : 1350,
        //                         retailPrice          : 1350,
        //                         retailPriceNet       : 1134.4537815126,
        //                         basePrice            : 1350,
        //                         basePriceNet         : 1134.4537815126,
        //                         unitPrice            : 1350,
        //                         unitPriceNet         : 1134.4537815126,
        //                         orderParamsMarkup    : 0,
        //                         orderParamsMarkupNet : 0,
        //                         classRebatePercent   : 0,
        //                         classRebate          : 0,
        //                         classRebateNet       : 0,
        //                         categoryRebatePercent: 0,
        //                         categoryRebate       : 0,
        //                         categoryRebateNet    : 0,
        //                         vatId                : 0,
        //                         vatValue             : 19,
        //                         currency             : "EUR",
        //                         exchangeRatio        : 1,
        //                         minimumOrderQuantity : "1.00",
        //                         lastUpdateTimestamp  : "2016-09-05 13:25:20"
        //                     },
        //                     priceData: {
        //                         priceId             : 2,
        //                         price               : 1500,
        //                         retailPrice         : 1500,
        //                         retailPriceNet      : 1260.5042016807,
        //                         basePrice           : 1500,
        //                         basePriceNet        : 1260.5042016807,
        //                         unitPrice           : 1500,
        //                         unitPriceNet        : 1260.5042016807,
        //                         orderParamsMarkup   : 0,
        //                         orderParamsMarkupNet: 0,
        //                         vatId               : 0,
        //                         vatValue            : 19,
        //                         currency            : "EUR",
        //                         exchangeRatio       : 1,
        //                         minimumOrderQuantity: "0.00",
        //                         lastUpdateTimestamp : "2016-09-05 13:25:20"
        //                     },
        //                     variationStandardCategory      : {
        //                         categoryId: 18
        //                     }
        //                 }
        //             ]
        //         }
        //     };
        // }
    },

    computed:
    {
        pageMax: function()
        {
            var pageMax = this.itemList.data.totalsCount / this.itemsPerPage;

            if (this.itemList.data.totalsCount % this.itemsPerPage > 0)
            {
                pageMax += 1;
            }

            return parseInt(pageMax);
        }
    }
});
