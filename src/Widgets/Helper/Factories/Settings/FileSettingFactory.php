<?php


namespace Ceres\Widgets\Helper\Factories\Settings;


class FileSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('file');
        $this->withDefaultValue('');
    }

    /**
     * @param boolean $showPreview
     * @return FileSettingFactory
     */
    public function withShowPreview($showPreview)
    {
        return $this->withOption('showPreview', $showPreview);
    }

    /**
     * @param string[] $allowedExtensions
     * @return FileSettingFactory
     */
    public function withAllowedExtensions($allowedExtensions)
    {
        return $this->withOption('allowedExtensions', $allowedExtensions);
    }

    /**
     * @param boolean $foldersAllowed
     * @return FileSettingFactory
     */
    public function withFoldersAllowed($foldersAllowed)
    {
        return $this->withOption('allowedFolders', $foldersAllowed);
    }
}