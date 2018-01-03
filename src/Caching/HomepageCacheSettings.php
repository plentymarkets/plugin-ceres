<?php
namespace Ceres\Caching;

use IO\Services\ContentCaching\Contracts\CachingSettings;
use Plenty\Plugin\ConfigRepository;

/**
 * Created by ptopczewski, 14.06.17 16:01
 * Class HomepageCacheSettings
 * @package Ceres\Caching
 */
class HomepageCacheSettings implements CachingSettings
{
    /**
     * @var ConfigRepository
     */
    private $configRepository;

    /**
     * HomepageCacheSettings constructor.
     * @param ConfigRepository $configRepository
     */
    public function __construct(ConfigRepository $configRepository)
    {
        $this->configRepository = $configRepository;
    }

    /**
     * @return bool
     */
    public function containsItems(): bool
    {
        return true;
    }

    /**
     * @return array
     */
    public function getData(): array
    {
        return [
            'name' => $this->configRepository->get('Ceres.item.name'),
            'sliderItemId1' => $this->configRepository->get('Ceres.homepage.sliderItemId1'),
            'sliderItemId2' => $this->configRepository->get('Ceres.homepage.sliderItemId2'),
            'sliderItemId3' => $this->configRepository->get('Ceres.homepage.sliderItemId3'),
            'sliderImageUrl1' => $this->configRepository->get('Ceres.homepage.sliderImageUrl1'),
            'sliderImageUrl2' => $this->configRepository->get('Ceres.homepage.sliderImageUrl2'),
            'sliderImageUrl3' => $this->configRepository->get('Ceres.homepage.sliderImageUrl3'),
            'heroExtraItemId1' => $this->configRepository->get('Ceres.homepage.heroExtraItemId1'),
            'heroExtraItemId2' => $this->configRepository->get('Ceres.homepage.heroExtraItemId2'),
            'heroExtraImageUrl1' => $this->configRepository->get('Ceres.homepage.heroExtraImageUrl1'),
            'heroExtraImageUrl2' => $this->configRepository->get('Ceres.homepage.heroExtraImageUrl2'),
            'homepageCategory1' => $this->configRepository->get('Ceres.homepage.homepageCategory1'),
            'homepageCategory2' => $this->configRepository->get('Ceres.homepage.homepageCategory2'),
            'homepageCategory3' => $this->configRepository->get('Ceres.homepage.homepageCategory3'),
            'homepageCategory4' => $this->configRepository->get('Ceres.homepage.homepageCategory4'),
            'homepageCategory5' => $this->configRepository->get('Ceres.homepage.homepageCategory5'),
            'homepageCategory6' => $this->configRepository->get('Ceres.homepage.homepageCategory6'),
        ];

    }
}