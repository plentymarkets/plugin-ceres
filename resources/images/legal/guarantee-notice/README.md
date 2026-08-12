# Guarantee notice SVGs

Drop the locale-specific legal guarantee notice SVGs in this folder, named
`guarantee_notice_<CODE>.svg`, where `<CODE>` is the uppercase suffix
resolved by `Ceres\Extensions\TwigGuaranteeNotice::getSvgFilename()`.

Required: `guarantee_notice_EN.svg` (fallback for any language without a
translated asset).

The full list of suffixes currently resolved by the extension:
DE, EN, BG, FR, IT, ES, TR, NL, PL, PT, NN, RO, DA, SV, CS, RU, SK.

Note the locale overrides: Swedish shops use webshop language code `se` but
the asset must be named `guarantee_notice_SV.svg`; Czech shops use `cz` but
the asset must be named `guarantee_notice_CS.svg`.

This README is a placeholder — delete it once the real SVG assets have been
added.
