<?php

namespace Ceres\Migrations;

use Plenty\Modules\ContentBuilder\Contracts\ContentRepositoryContract;
use Plenty\Modules\ContentBuilder\Contracts\ContentStorageRepositoryContract;
use Plenty\Modules\ContentBuilder\Contracts\ContentLinkRepositoryContract;
use Plenty\Modules\ContentBuilder\Models\Content;

use Plenty\Modules\Plugin\PluginSet\Contracts\PluginSetRepositoryContract;
use Plenty\Modules\Plugin\PluginSet\Models\PluginSet;

class HomepageShopBuilderMigration_0_0_1
{
    const DATA_PROVIDER_NAME = 'Ceres::Homepage';
    private $widgets = [];
    
    public function run()
    {
        /** @var PluginSetRepositoryContract $pluginSetRepo */
        $pluginSetRepo = pluginApp(PluginSetRepositoryContract::class);
        $pluginSets = $pluginSetRepo->list();
        
        /** @var PluginSet $pluginSet */
        foreach($pluginSets as $pluginSet)
        {
            foreach($pluginSet->pluginSetEntries as $pluginSetEntry)
            {
                if($pluginSetEntry->plugin->name === 'Ceres')
                {
                    $pluginSetId = $pluginSetEntry->pluginSetId;
                    $config = $pluginSetEntry->configurations()->getResults();
                    
                    $cfg = [];
                    foreach($config as $configEntry)
                    {
                        if(strpos($configEntry->key, 'homepage.') === 0 || $configEntry->key == 'header.company_name')
                        {
                            $cfg[str_replace('homepage.', '', $configEntry->key)] =  $configEntry->value;
                        }
                    }
                    
                    $this->migrate($pluginSetId, $cfg);
                }
            }
        }
    }
    
    private function migrate($pluginSetId, $config)
    {
        $this->widgets = [];
    
        $config = $this->checkConfig($config);
        
        $titleBar = $this->createTitleBarWidget($config['header.company_name']);
        $this->addWidget($titleBar);
    
        $this->createFirstRow($config);
        $this->createSecondRow($config);
        $this->createThirdRow($config);
        $this->createFourthRow($config);
        $this->createFifthRow($config);
    
        $this->saveWidgets($pluginSetId);
    }
    
    private function createFirstRow($config)
    {
        $firstRow = [];
        
        $slides = [
            [
                'variationId'     => $config['sliderItemId1'],
                'customImagePath' => $config['sliderImageUrl1']
            ],
            [
                'variationId'     => $config['sliderItemId2'],
                'customImagePath' => $config['sliderImageUrl2']
            ],
            [
                'variationId'     => $config['sliderItemId3'],
                'customImagePath' => $config['sliderImageUrl3']
            ]
        ];
    
        $slidesExist = $this->checkSlides($slides);
    
        if($slidesExist && $this->checkValues(
            [
                [$config['heroExtraItemId1'], $config['heroExtraImageUrl1']],
                [$config['heroExtraItemId2'], $config['heroExtraImageUrl2']]
            ])
        )
        {
            $firstRow = $this->createThreeColumnWidget(
                'twoToOneStacked',
                [
                    [$this->createSliderWidget($slides)],
                    [$this->createImageBoxWidget(
                        $config['heroExtraItemId1'],
                        '',
                        $config['heroExtraImageUrl1'],
                        $this->checkValue($config['heroExtraItemId1']) ? 'block-caption' : 'no-caption'
                    )],
                    [$this->createImageBoxWidget
                    ($config['heroExtraItemId2'],
                        '',
                        $config['heroExtraImageUrl2'],
                        $this->checkValue($config['heroExtraItemId2']) ? 'block-caption' : 'no-caption'
                    )]
                ]
            );
        }
        elseif($slidesExist && $this->checkValues([$config['heroExtraItemId1'], $config['heroExtraImageUrl1']], false))
        {
            $firstRow = $this->createTwoColumnWidget(
                'oneToOne',
                [
                    [$this->createSliderWidget($slides)],
                    [$this->createImageBoxWidget($config['heroExtraItemId1'], '', $config['heroExtraImageUrl1'], 'block-caption')]
                ]
            );
        }
        elseif($slidesExist && $this->checkValues([$config['heroExtraItemId2'], $config['heroExtraImageUrl2']], false))
        {
            $firstRow = $this->createTwoColumnWidget(
                'oneToOne',
                [
                    [$this->createSliderWidget($slides)],
                    [$this->createImageBoxWidget($config['heroExtraItemId2'], '', $config['heroExtraImageUrl2'], 'block-caption')]
                ]
            );
        }
        elseif(!$slidesExist && $this->checkValues(
                [
                    [$config['heroExtraItemId1'], $config['heroExtraImageUrl1']],
                    [$config['heroExtraItemId2'], $config['heroExtraImageUrl2']]
                ])
        )
        {
            $firstRow = $this->createTwoColumnWidget(
                'oneToOne',
                [
                    [$this->createImageBoxWidget($config['heroExtraItemId1'], '', $config['heroExtraImageUrl1'], 'block-caption')],
                    [$this->createImageBoxWidget($config['heroExtraItemId2'], '', $config['heroExtraImageUrl2'], 'block-caption')]
                ]
            );
        }
        elseif($slidesExist)
        {
            $firstRow = $this->createSliderWidget($slides);
        }
        elseif(!$slidesExist && $this->checkValues([$config['heroExtraItemId1'], $config['heroExtraImageUrl1']], false))
        {
            $firstRow = $this->createImageBoxWidget($config['heroExtraItemId1'], '', $config['heroExtraImageUrl1'], 'block-caption');
        }
        elseif(!$slidesExist && $this->checkValues([$config['heroExtraItemId2'], $config['heroExtraImageUrl2']], false))
        {
            $firstRow = $this->createImageBoxWidget($config['heroExtraItemId2'], '', $config['heroExtraImageUrl2'], 'block-caption');
        }
        
        $this->addWidget($firstRow);
    }
    
    private function createSecondRow($config)
    {
        $secondRow = [];
        
        if($this->checkValues([$config['homepageCategory1'], $config['homepageCategory2']]))
        {
            $secondRow = $this->createTwoColumnWidget(
                'oneToOne',
                [
                    [$this->createImageBoxWidget('', $config['homepageCategory1'], '', 'fullwidth', 'secondary')],
                    [$this->createImageBoxWidget('', $config['homepageCategory2'], '', 'fullwidth', 'secondary')]
                ]
            );
        }
        elseif($this->checkValues([$config['homepageCategory1']]))
        {
            $secondRow = $this->createImageBoxWidget('', $config['homepageCategory1'], '', 'fullwidth', 'secondary');
        }
        elseif($this->checkValues([$config['homepageCategory2']]))
        {
            $secondRow = $this->createImageBoxWidget('', $config['homepageCategory2'], '', 'fullwidth', 'secondary');
        }
        
        $this->addWidget($secondRow);
    }
    
    private function createThirdRow($config)
    {
        //first category item list (Category to display in the first list of items)
        $firstCategoryItemList = $this->createCategoryItemListWidget($config['homepageCategory3']);
        $this->addWidget($firstCategoryItemList);
    }
    
    private function createFourthRow($config)
    {
        $fourthRow = [];
    
        if($this->checkValues([$config['homepageCategory4'], $config['homepageCategory5']]))
        {
            $fourthRow = $this->createTwoColumnWidget(
                'twoToOne',
                [
                    [$this->createImageBoxWidget('', $config['homepageCategory4'], '', 'inline-caption')],
                    [$this->createImageBoxWidget('', $config['homepageCategory5'], '', 'inline-caption')]
                ]
            );
        }
        elseif($this->checkValues([$config['homepageCategory4']]))
        {
            $fourthRow = $this->createImageBoxWidget('', $config['homepageCategory4'], '', 'inline-caption');
        }
        elseif($this->checkValues([$config['homepageCategory5']]))
        {
            $fourthRow = $this->createImageBoxWidget('', $config['homepageCategory5'], '', 'inline-caption');
        }
    
        $this->addWidget($fourthRow);
    }
    
    private function createFifthRow($config)
    {
        //second category item list (Category to display in the second list of items)
        $secondCategoryItemList = $this->createCategoryItemListWidget($config['homepageCategory6']);
        $this->addWidget($secondCategoryItemList);
    }
    
    private function createTitleBarWidget($companyName)
    {
        return [
            'identifier' => 'Ceres::TitleBarWidget',
            'children' => [],
            'widgetSettings' => [
                'text' => $this->createWidgetSettingsEntry($companyName)
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
        return !is_null($value) && strlen((string)$value) && (int)$value > 0;
    }
    
    private function checkConfig($config)
    {
        $map = [
            'header.company_name',
            'sliderItemId1',
            'sliderImageUrl1',
            'sliderItemId2',
            'sliderImageUrl2',
            'sliderItemId3',
            'sliderImageUrl3',
            'heroExtraItemId1',
            'heroExtraImageUrl1',
            'heroExtraItemId2',
            'heroExtraImageUrl2',
            'homepageCategory1',
            'homepageCategory2',
            'homepageCategory3',
            'homepageCategory4',
            'homepageCategory5',
            'homepageCategory6',
        ];
        
        foreach($map as $key)
        {
            if(!array_key_exists($key, $config))
            {
                $config[$key] = null;
            }
        }
        
        return $config;
    }
    
    private function saveWidgets($pluginSetId)
    {
        /** @var ContentRepositoryContract $contentRepo */
        $contentRepo = pluginApp(ContentRepositoryContract::class);
        /** @var Content $content */
        $content = $contentRepo->createContent(self::DATA_PROVIDER_NAME);
        $contentRepo->updateContent([
            'dataProviderName' => self::DATA_PROVIDER_NAME,
            'type' => 'content'
        ], $content->id);
        
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