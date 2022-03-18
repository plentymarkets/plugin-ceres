<?php

namespace Ceres\Widgets\MyAccount;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;
use Illuminate\Database\Eloquent\Collection;
use IO\Helper\Utils;
use Plenty\Modules\Authorization\Services\AuthHelper;
use Plenty\Modules\Order\Status\Contracts\OrderStatusRepositoryContract;
use Plenty\Modules\Order\Status\Models\OrderStatus;

class OrderHistoryWidget extends BaseWidget
{
    /** @var Collection $statuses A collection of all order statuses */
    private $statuses = null;

    /** @var null|string $lang The currently selected shop language */
    private $lang = null;

    /** @inheritDoc */
    protected $template = "Ceres::Widgets.MyAccount.OrderHistoryWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::OrderHistoryWidget")
            ->withLabel("Widget.orderHistoryLabel")
            ->withPreviewImageUrl("/images/widgets/order-history.svg")
            ->withType(WidgetTypes::MY_ACCOUNT)
            ->withCategory(WidgetCategories::MY_ACCOUNT)
            ->withPosition(100)
            ->withMaxPerPage(1)
            ->withSearchKeyWords([
                "order", "history", "bestellverlauf", "historie"
            ])
            ->toArray();
    }

    /**
     * @inheritDoc
     */
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createCustomClass();
        $settings->createAppearance();

        $settings->createSelect("ordersPerPage")
            ->withDefaultValue(5)
            ->withName("Widget.orderHistoryOrdersPerPageLabel")
            ->withTooltip("Widget.orderHistoryOrdersPerPageTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry(5, "Widget.orderHistoryOrdersPerPage5")
                    ->addEntry(10, "Widget.orderHistoryOrdersPerPage10")
                    ->addEntry(25, "Widget.orderHistoryOrdersPerPage25")
                    ->addEntry(50, "Widget.orderHistoryOrdersPerPage50")
                    ->toArray()
            );

        $settings->createCheckbox("allowPaymentProviderChange")
            ->withDefaultValue(true)
            ->withName("Widget.orderHistoryAllowPaymentProviderChangeLabel")
            ->withTooltip("Widget.orderHistoryAllowPaymentProviderChangeTooltip");

        $settings->createCheckbox("allowReturn")
            ->withDefaultValue(true)
            ->withName("Widget.orderHistoryAllowReturnLabel")
            ->withTooltip("Widget.orderHistoryAllowReturnTooltip");

        $settings->createCheckbox("outline")
            ->withDefaultValue(false)
            ->withName("Widget.orderHistoryOutlineLabel")
            ->withTooltip("Widget.orderHistoryOutlineTooltip");

        $settings->createSpacing(false, true);

        return $settings->toArray();
    }

    protected function getItemsPerPage($widgetSettings)
    {
        return $widgetSettings["ordersPerPage"]["mobile"] ?? 5;
    }

    /**
     * @inheritDoc
     */
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
