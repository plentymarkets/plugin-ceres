<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;

class LiveShoppingWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Common.LiveShoppingWidget";
    
    protected function getTemplateData($widgetSettings, $isPreview)
    {
        return [
            'liveShoppingConfig' => $this->transformWidgetSettings($widgetSettings)
        ];
    }
    
    private function transformWidgetSettings($widgetSettings)
    {
        $transformedSettings = [];
        foreach($widgetSettings as $key => $setting)
        {
            $transformedSettings[$key] = $setting['mobile'];
        }
        
        return $transformedSettings;
    }
}
