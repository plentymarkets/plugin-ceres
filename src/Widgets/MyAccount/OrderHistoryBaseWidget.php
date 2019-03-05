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
        $status = $this->statuses[$idx];

        if (isset($status))
        {
            return $status->names[$this->lang];
        }

        return "";
    }
}
