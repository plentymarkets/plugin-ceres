<?php


namespace Ceres\Widgets\Helper\Factories\Settings;


class FileSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('file');
    }

    /**
     * @param boolean $showPreview
     */
    public function withPreview($showPreview)
    {
        $this->withOption('showPreview', $showPreview);
    }

    /**
     * @param string[] $allowedExtensions
     */
    public function withAllowedExtensions($allowedExtensions)
    {
        $this->withOption('allowedExtensions', $allowedExtensions);
    }

    /**
     * @param boolean $foldersAllowed
     */
    public function withFolders($foldersAllowed)
    {
        $this->withOption('allowedFolders', $foldersAllowed);
    }
}