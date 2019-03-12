<?php

namespace Ceres\Widgets\Common;

class LinkListWidget extends ListWidget
{
    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $templateData = parent::getTemplateData($widgetSettings, $isPreview);
        $templateData['isLinkList'] = true;
        return $templateData;
    }
}
