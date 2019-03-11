<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;

class TextWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Common.TextWidget";

    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $isInlineEditable = true;
        $content = '';

        if ( $widgetSettings['useCustomMarkup']['mobile']
            || (!array_key_exists('content', $widgetSettings) && strlen($widgetSettings['text']['mobile'])) )
        {
            $isInlineEditable = false;
            $content = $widgetSettings['text']['mobile'];
        }
        else
        {
            $content = $widgetSettings['content']['mobile'];
        }

        return [
            'isInlineEditable' => $isInlineEditable,
            'content'          => $content
        ];
    }
}
