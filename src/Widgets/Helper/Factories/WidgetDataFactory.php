<?php

namespace Ceres\Widgets\Helper\Factories;

class WidgetDataFactory
{
    private $data = [];

    /**
     * Create a new widget factory instance.
     *
     * @param string $identifier Unique identifier of the widget.
     *
     * @return WidgetDataFactory
     */
    public static function make($identifier)
    {
        /** @var WidgetDataFactory $instance */
        $instance = pluginApp(WidgetDataFactory::class);
        $instance->data["identifier"] = $identifier;
        return $instance;
    }

    /**
     * Set a label for this widget. Will be translated.
     *
     * @param string $label Label of the widget to be displayed in the shop builder
     * @return $this
     */
    public function withLabel($label)
    {
        $this->data["label"] = $label;
        return $this;
    }

    /**
     * Set the url of a preview image for the widget.
     * Path of the plugin resources will be prepended.
     *
     * @param string $previewImageUrl
     * @return $this
     */
    public function withPreviewImageUrl($previewImageUrl)
    {
        $this->data["previewImageURL"] = $previewImageUrl;
        return $this;
    }

    /**
     * Set the type of the widget. @see WidgetTypes
     *
     * @param string $type  Type of the widget
     * @return $this
     */
    public function withType($type)
    {
        $this->data["type"] = $type;
        return $this;
    }

    /**
     * Add a category for the widget. A widget might be assigned to multiple categories.
     * @see WidgetCategories
     *
     * @param string $category
     * @return $this
     */
    public function withCategory($category)
    {
        $this->data["categories"] = $this->data["categories"] ?? [];
        $this->data["categories"][] = $category;
        return $this;
    }

    /**
     * Set the position of the widget.
     *
     * @param int $position Position of the widget
     * @return $this
     */
    public function withPosition($position)
    {
        $this->data["position"] = $position;
        return $this;
    }

     /**
     * Limit the amount of times a widget can be placed on a content.
     *
     * @param int $maxPerPage Maximum allowed amount of instances of the widget on a content
     * @return $this
     */
    public function withMaxPerPage($maxPerPage)
    {
        $this->data['maxPerPage'] = $maxPerPage;
        return $this;
    }

    /**
     * Limits the widget types that you can drop into this widget.
     *
     * @param WidgetTypes[] $allowedTypes
     * @return $this
     */
    public function withAllowedNestingTypes($allowedTypes)
    {
        $this->data['allowedNestingTypes'] = $allowedTypes;
        return $this;
    }
  
    /**
     * Set the widget as deprecated.
     *
     * @return $this
     */
    public function withDeprecated()
    {
        $this->data['deprecated'] = true;
        return $this;
    }

    /**
     * List of keywords for the shopBuilder widget search
     *
     * @param string[] $keywords
     * @return $this
     */
    public function withSearchKeyWords($keywords){
        $this->data['keywords'] = $keywords;
        return $this;
    }

    /**
     * Get widget data.
     *
     * @return array
     */
    public function toArray()
    {
        return $this->data;
    }
}
