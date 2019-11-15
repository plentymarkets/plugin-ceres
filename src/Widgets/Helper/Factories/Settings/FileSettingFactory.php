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
    public function withShowPreview($showPreview)
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
    public function withFoldersAllowed($foldersAllowed)
    {
        $this->withOption('allowedFolders', $foldersAllowed);
    }
}