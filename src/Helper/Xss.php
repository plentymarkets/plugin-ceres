<?php

namespace Ceres\Helper;

/**
 * Class XSS
 *
 * Helper to test strings for special xss
 *
 * @package Ceres\Helper
 */
class XSS
{
    /**
     * Check string for vue xss payload
     * @param string payload string
     * @return boolean
     */
    public static function testVue($payload)
    {
        return !!preg_match('/\$\{.*\}/', $payload);
    }
}