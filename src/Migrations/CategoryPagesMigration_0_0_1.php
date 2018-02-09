<?php

namespace Ceres\Migrations;

use IO\Services\CategoryPagesMigrationService;
use Plenty\Modules\Category\Contracts\CategoryRepositoryContract;
use Plenty\Plugin\Application;
use Plenty\Plugin\ConfigRepository;

class CategoryPagesMigration_0_0_1
{
    private $pages = [
        [
            'template'      => 'CancellationForm',
            'names'         => [
                'de'   => 'Widerrufsformular',
                'en'   => 'Cancellation form'
            ],
            'metaConfigKey' => 'cancel_form'
        ],
        [
            'template'      => 'CancellationRights',
            'names'         => [
                'de'   => 'Widerrufsrecht',
                'en'   => 'Cancellation rights'
            ],
            'metaConfigKey' => 'cancel_rights'
        ],
        [
            'template'      => 'LegalDisclosure',
            'names'         => [
                'de'   => 'Impressum',
                'en'   => 'Legal disclosure'
            ],
            'metaConfigKey' => 'legal_disclosure'
        ],
        [
            'template'      => 'PrivacyPolicy',
            'names'         => [
                'de'   => 'Datenschutzerklärung',
                'en'   => 'Privacy policy'
            ],
            'metaConfigKey' => 'privacy_policy'
        ],
        [
            'template'      => 'TermsAndConditions',
            'names'         => [
                'de'   => 'AGB',
                'en'   => 'Terms and conditions'
            ],
            'metaConfigKey' => 'terms_and_conditions'
        ]
    ];

    public function run()
    {
        /** @var CategoryRepositoryContract $categoryRepository */
        $categoryRepository = pluginApp( CategoryRepositoryContract::class );
        $plentyId = pluginApp( Application::class )->getPlentyId();

        $parentCategory = $categoryRepository->createCategory([
            'type'      => 'content',
            'level'     => 0,
            'details'   => [
                [
                    'plentyId'  => $plentyId,
                    'lang'      => 'de',
                    'name'      => 'Ceres 2.3.0'
                ],
                [
                    'plentyId'  => $plentyId,
                    'lang'      => 'en',
                    'name'      => 'Ceres 2.3.0'
                ]
            ],
            'clients'   => [
                ['plentyId' => $plentyId]
            ]
        ]);

        /** @var CategoryPagesMigrationService $categoryPagesMigrationService */
        $categoryPagesMigrationService = pluginApp(CategoryPagesMigrationService::class);

        /** @var ConfigRepository $configRepository */
        $configRepository = pluginApp( ConfigRepository::class );

        foreach( $this->pages as $page )
        {
            $categoryPagesMigrationService->createCategoryFromTwig(
                "Ceres::StaticPages.StaticPagesContent." . $page['template'] . "Content",
                $page['names'],
                $parentCategory->id,
                [
                    "de" => [
                        "metaDescription"   => $configRepository->get("Ceres.meta.de.description_" . $page['metaConfigKey'] ),
                        "metaRobots"         => $this->transformRobotsValue(
                            $configRepository->get("Ceres.meta.robots_" . $page['metaConfigKey'] )
                        )
                    ],
                    "en" => [
                        "metaDescription"   => $configRepository->get("Ceres.meta.en.description_" . $page['metaConfigKey'] ),
                        "metaRobots"         => $this->transformRobotsValue(
                            $configRepository->get("Ceres.meta.robots_" . $page['metaConfigKey'] )
                        )
                    ]
                ]
            );
        }
    }

    private function transformRobotsValue( $value )
    {
        switch( $value )
        {
            case "all":
                return "ALL";
            case "index":
                return "INDEX";
            case "nofollow";
                return "NOFOLLOW";
            case "noindex":
                return "NOINDEX";
            case "noindex, nofollow":
                return "NOINDEX_NOFOLLOW";
            default:
                return "ALL";
        }
    }
}