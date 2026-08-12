<?php
namespace Ceres\Extensions;

use Plenty\Plugin\Templates\Extensions\Twig_Extension;
use Plenty\Plugin\Templates\Factories\TwigFactory;

/**
 * Class TwigGuaranteeNotice
 * This TWIG extension resolves the file name of the locale-specific legal
 * guarantee notice SVG for the checkout page, falling back to English for
 * languages without a translated asset.
 *
 * @package Ceres\Extensions
 */
class TwigGuaranteeNotice extends Twig_Extension
{
    /**
     * @var array $localeOverrides Maps a webshop language code to the ISO code used in the asset file name,
     * for codes that don't match the file name suffix directly.
     */
    private static $localeOverrides = [
        'se' => 'SV',
        'cz' => 'CS'
    ];

    /**
     * @var array $availableLanguages Webshop language codes for which a translated asset exists.
     * Any language not listed here falls back to the English asset.
     */
    private static $availableLanguages = [
        'de', 'en', 'bg', 'fr', 'it', 'es', 'tr', 'nl', 'pl', 'pt',
        'nn', 'ro', 'da', 'se', 'cz', 'ru', 'sk'
    ];

    /**
     * @var TwigFactory $twig The factory to render TWIG.
     */
    private $twig;

    /**
     * TwigGuaranteeNotice constructor.
     * @param TwigFactory $twig The factory to render TWIG.
     */
    public function __construct(TwigFactory $twig)
    {
        $this->twig = $twig;
    }

    /**
     * Return the name of the extension.
     *
     * @return string The name of the extension.
     */
    public function getName(): string
    {
        return "Ceres_Extension_TwigGuaranteeNotice";
    }

    /**
     * Return a list of functions to add.
     *
     * @return array The list of functions to add.
     */
    public function getFunctions(): array
    {
        return [
            $this->twig->createSimpleFunction('guarantee_notice_svg_filename', [$this, 'getSvgFilename'])
        ];
    }

    /**
     * Resolve the file name of the guarantee notice SVG for the given webshop language code.
     *
     * @param string $lang The current webshop language code, e.g. "de".
     * @return string The file name of the SVG asset to use, e.g. "guarantee_notice_DE.svg".
     */
    public function getSvgFilename($lang): string
    {
        $code = strtolower((string) $lang);

        if (array_key_exists($code, self::$localeOverrides)) {
            $suffix = self::$localeOverrides[$code];
        }
        elseif (in_array($code, self::$availableLanguages, true)) {
            $suffix = strtoupper($code);
        }
        else {
            $suffix = 'EN';
        }

        return 'guarantee_notice_' . $suffix . '.svg';
    }
}
