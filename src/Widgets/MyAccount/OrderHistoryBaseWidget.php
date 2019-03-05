<?php

namespace Ceres\Widgets\MyAccount;

use Ceres\Widgets\Helper\BaseWidget;
use Illuminate\Support\Collection;
use IO\Services\SessionStorageService;
use Plenty\Modules\Order\Status\Contracts\OrderStatusRepositoryContract;
use Plenty\Modules\Order\Status\Models\OrderStatus;

class OrderHistoryBaseWidget extends BaseWidget
{
    /** @var Collection */
    private $statuses = null;

    /** @var string */
    private $lang = null;

    protected function getItemsPerPage($widgetSettings)
    {
        return 5;
    }

    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $previewData = null;

        if ( $isPreview )
        {
            $previewData = $this->mockPaginatedResult(
                function($i)
                {
                    return [
                        "id"            => $i,
                        "total"         => rand(100, 100000) / 100,
                        "status"        => $this->getRandomStatusName(),
                        "creationDate"  => date("Y-m-d H:i:s")
                    ];
                },
                $this->getItemsPerPage($widgetSettings)

            );
        }

        return [
            "previewData" => $previewData
        ];
    }

    protected function getRandomStatusName()
    {
        if ( is_null($this->statuses) )
        {
            $this->statuses = [];
            $statuses = pluginApp(OrderStatusRepositoryContract::class)->all();

            /** @var OrderStatus $status */
            foreach( $statuses as $status )
            {
                if ($status->isFrontendVisible)
                {
                    $this->statuses[] = $status;
                }
            }
            $this->lang     = pluginApp(SessionStorageService::class)->getLang();
        }

        $idx = rand(0, count($this->statuses) - 1);

        return $this->statuses[$idx];
    }
}
