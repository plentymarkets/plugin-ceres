<?php

namespace Ceres\Widgets\MyAccount;

use Ceres\Widgets\Helper\BaseWidget;
use IO\Helper\Utils;
use IO\Services\SessionStorageService;
use Plenty\Modules\Authorization\Services\AuthHelper;
use Plenty\Modules\Order\Status\Contracts\OrderStatusRepositoryContract;
use Plenty\Modules\Order\Status\Models\OrderStatus;

class OrderHistoryWidget extends BaseWidget
{
    private $statuses = null;
    private $lang = null;

    protected $template = "Ceres::Widgets.MyAccount.OrderHistoryWidget";

    protected function getItemsPerPage($widgetSettings)
    {
        return $widgetSettings["ordersPerPage"]["mobile"] ?? 5;
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
                $widgetSettings["ordersPerPage"]["mobile"] ?? 5

            );
        }

        return [
            "previewData" => $previewData
        ];
    }

    private function getRandomStatusName()
    {
        if ( is_null($this->statuses) )
        {
            $this->statuses = [];
            /** @var AuthHelper $authHelper */
            $authHelper = pluginApp(AuthHelper::class);
            $statuses = $authHelper->processUnguarded(function() {
                /** @var OrderStatusRepositoryContract $orderStatusRepo */
                $orderStatusRepo = pluginApp(OrderStatusRepositoryContract::class);
                return $orderStatusRepo->all();
            });

            /** @var OrderStatus $status */
            foreach( $statuses as $status )
            {
                if ($status->isFrontendVisible)
                {
                    $this->statuses[] = $status;
                }
            }
            $this->lang = Utils::getLang();
        }

        $idx = rand(0, count($this->statuses) - 1);
        $status = $this->statuses[$idx];

        if (isset($status))
        {
            return $status->names[$this->lang];
        }

        return "";
    }
}
