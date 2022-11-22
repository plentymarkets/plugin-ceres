<?php

namespace Ceres\Migrations;

use Plenty\Modules\Payment\Method\Contracts\PaymentMethodRepositoryContract;

class Migration_2022_11_18_001_CreateAlreadyPaidPaymentMethod
{
    public function run()
    {
        /** @var PaymentMethodRepositoryContract# $paymentMethodRepositoryContract */
        $paymentMethodRepositoryContract = pluginApp(PaymentMethodRepositoryContract::class);
        $paymentMethodRepositoryContract->createPaymentMethod([
            'pluginKey' => 'Ceres',
            'paymentKey' => 'ALREADY_PAID',
            'name' => 'Already paid'
        ]);
    }
}
