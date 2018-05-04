<?php

namespace Ceres\Migrations;

use Ceres\Config\CeresConfig;
use Ceres\Config\CeresHomepageConfig;
use Plenty\Modules\ContentBuilder\Contracts\ContentRepositoryContract;
use Plenty\Modules\ContentBuilder\Contracts\ContentStorageRepositoryContract;
use Plenty\Modules\ContentBuilder\Contracts\ContentLinkRepositoryContract;
use Plenty\Modules\ContentBuilder\Models\Content;
use Plenty\Plugin\ConfigRepository;

class HomepageShopBuilderMigration_0_0_1
{
    const DATA_PROVIDER_NAME = 'Ceres::Homepage';
    
    /** @var CeresHomepageConfig */
    private $hpConfig = null;
    private $widgets = [];
    
    public function run()
    {
        /** @var CeresConfig $ceresConfig */
        $ceresConfig = pluginApp(CeresConfig::class);
        $this->hpConfig = $ceresConfig->homepage;
        
        $titleBar = $this->createTitleBarWidget();
        $this->addWidget($titleBar);
        
        $this->createFirstRow();
        $this->createSecondRow();
        $this->createThirdRow();
        $this->createFourthRow();
        $this->createFifthRow();
        
        $this->saveWidgets();
    }
    
    private function createFirstRow()
    {
        $firstRow = [];
        
        $slides = [
            [
                'variationId' => $this->hpConfig->sliderItemId1,
                'customImagePath' => $this->hpConfig->sliderImageUrl1
            ],
            [
                'variationId' => $this->hpConfig->sliderItemId2,
                'customImagePath' => $this->hpConfig->sliderImageUrl2
            ],
            [
                'variationId' => $this->hpConfig->sliderItemId3,
                'customImagePath' => $this->hpConfig->sliderImageUrl3
            ]
        ];
    
        $slidesExist = $this->checkSlides($slides);
    
        if($slidesExist && $this->checkValues(
            [
                [$this->hpConfig->heroExtraItemId1, $this->hpConfig->heroExtraImageUrl1],
                [$this->hpConfig->heroExtraItemId2, $this->hpConfig->heroExtraImageUrl2]
            ])
        )
        {
            $firstRow = $this->createThreeColumnWidget(
                'twoToOneStacked',
                [
                    [$this->createSliderWidget($slides)],
                    [$this->createImageBoxWidget(
                        $this->hpConfig->heroExtraItemId1,
                        '',
                        $this->hpConfig->heroExtraImageUrl1,
                        $this->checkValue($this->hpConfig->heroExtraItemId1) ? 'block-caption' : 'no-caption'
                    )],
                    [$this->createImageBoxWidget
                    ($this->hpConfig->heroExtraItemId2,
                        '',
                        $this->hpConfig->heroExtraImageUrl2,
                        $this->checkValue($this->hpConfig->heroExtraItemId2) ? 'block-caption' : 'no-caption'
                    )]
                ]
            );
        }
        elseif($slidesExist && $this->checkValues([$this->hpConfig->heroExtraItemId1, $this->hpConfig->heroExtraImageUrl1], false))
        {
            $firstRow = $this->createTwoColumnWidget(
                'oneToOne',
                [
                    [$this->createSliderWidget($slides)],
                    [$this->createImageBoxWidget($this->hpConfig->heroExtraItemId1, '', $this->hpConfig->heroExtraImageUrl1, 'block-caption')]
                ]
            );
        }
        elseif($slidesExist && $this->checkValues([$this->hpConfig->heroExtraItemId2, $this->hpConfig->heroExtraImageUrl2], false))
        {
            $firstRow = $this->createTwoColumnWidget(
                'oneToOne',
                [
                    [$this->createSliderWidget($slides)],
                    [$this->createImageBoxWidget($this->hpConfig->heroExtraItemId2, '', $this->hpConfig->heroExtraImageUrl2, 'block-caption')]
                ]
            );
        }
        elseif(!$slidesExist && $this->checkValues(
                [
                    [$this->hpConfig->heroExtraItemId1, $this->hpConfig->heroExtraImageUrl1],
                    [$this->hpConfig->heroExtraItemId2, $this->hpConfig->heroExtraImageUrl2]
                ])
        )
        {
            $firstRow = $this->createTwoColumnWidget(
                'oneToOne',
                [
                    [$this->createImageBoxWidget($this->hpConfig->heroExtraItemId1, '', $this->hpConfig->heroExtraImageUrl1, 'block-caption')],
                    [$this->createImageBoxWidget($this->hpConfig->heroExtraItemId2, '', $this->hpConfig->heroExtraImageUrl2, 'block-caption')]
                ]
            );
        }
        elseif($slidesExist)
        {
            $firstRow = $this->createSliderWidget($slides);
        }
        elseif(!$slidesExist && $this->checkValues([$this->hpConfig->heroExtraItemId1, $this->hpConfig->heroExtraImageUrl1], false))
        {
            $firstRow = $this->createImageBoxWidget($this->hpConfig->heroExtraItemId1, '', $this->hpConfig->heroExtraImageUrl1, 'block-caption');
        }
        elseif(!$slidesExist && $this->checkValues([$this->hpConfig->heroExtraItemId2, $this->hpConfig->heroExtraImageUrl2], false))
        {
            $firstRow = $this->createImageBoxWidget($this->hpConfig->heroExtraItemId2, '', $this->hpConfig->heroExtraImageUrl2, 'block-caption');
        }
        
        $this->addWidget($firstRow);
    }
    
    private function createSecondRow()
    {
        $secondRow = [];
        
        if($this->checkValues([$this->hpConfig->homepageCategory1, $this->hpConfig->homepageCategory2]))
        {
            $secondRow = $this->createTwoColumnWidget(
                'oneToOne',
                [
                    [$this->createImageBoxWidget('', $this->hpConfig->homepageCategory1, '', 'fullwidth', 'secondary')],
                    [$this->createImageBoxWidget('', $this->hpConfig->homepageCategory2, '', 'fullwidth', 'secondary')]
                ]
            );
        }
        elseif($this->checkValues([$this->hpConfig->homepageCategory1]))
        {
            $secondRow = $this->createImageBoxWidget('', $this->hpConfig->homepageCategory1, '', 'fullwidth', 'secondary');
        }
        elseif($this->checkValues([$this->hpConfig->homepageCategory2]))
        {
            $secondRow = $this->createImageBoxWidget('', $this->hpConfig->homepageCategory2, '', 'fullwidth', 'secondary');
        }
        
        $this->addWidget($secondRow);
    }
    
    private function createThirdRow()
    {
        //first category item list (Category to display in the first list of items)
        $firstCategoryItemList = $this->createCategoryItemListWidget($this->hpConfig->homepageCategory3);
        $this->addWidget($firstCategoryItemList);
    }
    
    private function createFourthRow()
    {
        $fourthRow = [];
    
        if($this->checkValues([$this->hpConfig->homepageCategory4, $this->hpConfig->homepageCategory5]))
        {
            $fourthRow = $this->createTwoColumnWidget(
                'twoToOne',
                [
                    [$this->createImageBoxWidget('', $this->hpConfig->homepageCategory4, '', 'inline-caption')],
                    [$this->createImageBoxWidget('', $this->hpConfig->homepageCategory5, '', 'inline-caption')]
                ]
            );
        }
        elseif($this->checkValues([$this->hpConfig->homepageCategory4]))
        {
            $fourthRow = $this->createImageBoxWidget('', $this->hpConfig->homepageCategory4, '', 'inline-caption');
        }
        elseif($this->checkValues([$this->hpConfig->homepageCategory5]))
        {
            $fourthRow = $this->createImageBoxWidget('', $this->hpConfig->homepageCategory5, '', 'inline-caption');
        }
    
        $this->addWidget($fourthRow);
    }
    
    private function createFifthRow()
    {
        //second category item list (Category to display in the second list of items)
        $secondCategoryItemList = $this->createCategoryItemListWidget($this->hpConfig->homepageCategory6);
        $this->addWidget($secondCategoryItemList);
    }
    
    private function createTitleBarWidget()
    {
        return [
            'identifier' => 'Ceres::TitleBarWidget',
            'children' => [],
            'widgetSettings' => [
                'text' => $this->createWidgetSettingsEntry('')
            ]
        ];
    }
    
    private function createTwoColumnWidget($layout, $children = [])
    {
        return [
            'identifier' => 'Ceres::TwoColumnWidget',
            'children' => [
                'first' => $children[0],
                'second' => $children[1]
            ],
            'widgetSettings' => [
                'layout' => $this->createWidgetSettingsEntry($layout)
            ]
        ];
    }
    
    private function createThreeColumnWidget($layout, $children = [])
    {
        return [
            'identifier' => 'Ceres::ThreeColumnWidget',
            'children' => [
                'first' => $children[0],
                'second' => $children[1],
                'third' => $children[2]
            ],
            'widgetSettings' => [
                'layout' => $this->createWidgetSettingsEntry($layout)
            ]
        ];
    }
    
    private function createSliderWidget($slides)
    {
        $sliderWidget = [
            'identifier' => 'Ceres::ImageCarouselWidget',
            'children' => [],
            'widgetSettings' => []
        ];
        
        foreach($slides as $key => $slide)
        {
            $k = $key + 1;
            $slideKey = 'slide'.$k;
            $sliderWidget['widgetSettings'][$slideKey] = [];
            if(!is_null($slide['variationId']) && (int)$slide['variationId'] > 0)
            {
                $sliderWidget['widgetSettings'][$slideKey]['variationId'] = $this->createWidgetSettingsEntry($slide['variationId']);
            }
            
            if(!is_null($slide['customImagePath']) && strlen($slide['customImagePath']))
            {
                $sliderWidget['widgetSettings'][$slideKey]['customImagePath'] = $this->createWidgetSettingsEntry($slide['customImagePath']);
            }
            else
            {
                $sliderWidget['widgetSettings'][$slideKey]['customImagePath'] = $this->createWidgetSettingsEntry('');
            }
        }
        
        return $sliderWidget;
    }
    
    private function createImageBoxWidget($variationId, $categoryId, $customImagePath, $style, $appearance = "primary")
    {
        return [
            'identifier' => 'Ceres::ImageBoxWidget',
            'children' => [],
            'widgetSettings' => [
                'appearance' => $this->createWidgetSettingsEntry($appearance),
                'style' => $this->createWidgetSettingsEntry($style),
                'imageSize' => $this->createWidgetSettingsEntry('cover'),
                'categoryId' => $this->createWidgetSettingsEntry($categoryId),
                'variationId' => $this->createWidgetSettingsEntry((int)$variationId),
                'customImagePath' => $this->createWidgetSettingsEntry($customImagePath)
            ]
        ];
    }
    
    private function createCategoryItemListWidget($categoryId)
    {
        $categoryItemListWidget = [];
    
        if(!is_null($categoryId) && (int)$categoryId > 0)
        {
            $categoryItemListWidget = [
                'identifier' => 'Ceres::ItemListWidget',
                'children'   => [],
                'widgetSettings' => [
                    'listType'   => $this->createWidgetSettingsEntry('category'),
                    'categoryId' => $this->createWidgetSettingsEntry((int)$categoryId),
                    'tagId'      => $this->createWidgetSettingsEntry(''),
                    'itemSort'   => $this->createWidgetSettingsEntry('texts.name1_asc'),
                    'maxItems'   => $this->createWidgetSettingsEntry('8')
                ]
            ];
        }
        
        return $categoryItemListWidget;
    }
    
    private function createWidgetSettingsEntry($value)
    {
        return [
            'mobile'       => $value,
            'tablet'       => $value,
            'desktop'      => $value,
            'largeDesktop' => $value
        ];
    }
    
    private function addWidget($widget)
    {
        if(!is_null($widget) && count($widget))
        {
            $this->widgets[] = $widget;
        }
    }
    
    private function checkSlides($slides)
    {
        foreach($slides as $slide)
        {
            if((int)$slide['variationId'] > 0)
            {
                return true;
            }
        }
        
        return false;
    }
    
    private function checkValues($values, $conjunctive = true)
    {
        foreach($values as $value)
        {
            if(is_array($value))
            {
                return $this->checkValues($value, !$conjunctive);

            }
            if($conjunctive && !$this->checkValue($value))
            {
                return false;
            }
            if(!$conjunctive && $this->checkValue($value))
            {
                return true;
            }
        }
        
        return $conjunctive;
    }
    
    private function checkValue($value)
    {
        return !is_null($value) && strlen($value) && (int)$value > 0;
    }
    
    private function saveWidgets()
    {
        /** @var ContentRepositoryContract $contentRepo */
        $contentRepo = pluginApp(ContentRepositoryContract::class);
        /** @var Content $content */
        $content = $contentRepo->createContent(self::DATA_PROVIDER_NAME);
        $contentRepo->updateContent([
            'dataProviderName' => self::DATA_PROVIDER_NAME,
            'type' => 'content'
        ], $content->id);
        
        $pluginSetId = pluginSetId();
        
        /** @var ContentLinkRepositoryContract $contentLinkRepo */
        $contentLinkRepo = pluginApp(ContentLinkRepositoryContract::class);
        $contentLinkRepo->createContentLink([
                                                'contentId'     => $content->id,
                                                'containerName' => self::DATA_PROVIDER_NAME,
                                                'pluginSetId'   => $pluginSetId,
                                            ]);
        
        //write widgets to s3 json file
        /** @var ContentStorageRepositoryContract $contentStorageRepo */
        $contentStorageRepo = pluginApp(ContentStorageRepositoryContract::class);
        $contentStorageRepo->createContentData($content->id, $this->widgets);
    }
  
}