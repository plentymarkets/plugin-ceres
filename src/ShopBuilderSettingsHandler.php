<?php

namespace Ceres;

use Plenty\Modules\Plugin\Contracts\ConfigurationRepositoryContract;
use Plenty\Modules\Plugin\Contracts\PluginRepositoryContract;
use Plenty\Modules\Plugin\Models\Configuration;

class ShopBuilderSettingsHandler
{
    const CONFIG = 'IO';
    
    /** @var ConfigurationRepositoryContract */
    private $configRepo;
    
    private $keyMap = [
        'category_checkout' => 'routing.category_checkout',
        'enabled_routes_checkout' => 'routing.enabled_routes'
    ];
    
    private $configMapOld = [
        'category_checkout' => [],
        'enabled_routes_checkout' => [
            'false' => '',
            'true' => 'checkout'
        ],
    ];
    
    public function __construct(ConfigurationRepositoryContract $configRepo)
    {
        $this->configRepo = $configRepo;
    }
    
    public function read($pluginSetId = null, $pluginName = null)
    {
        $config = $this->configRepo->loadConfigurationByPluginId($this->getPluginIdByName(self::CONFIG), $pluginSetId);
        
        $keyMap = $this->keyMap;
        $config = array_filter($config, function($configEntry) use ($keyMap) {
            return in_array($configEntry->key, $keyMap);
        });
        
        $keyMap = array_flip($keyMap);
        foreach($config as $key => $oldConfigEntry)
        {
            $oldConfigEntry = $oldConfigEntry->toArray();
            $newConfigKey = $keyMap[$oldConfigEntry['key']];
            $oldConfigEntry['key'] = $newConfigKey;
    
            $newValues = array_flip($this->configMapOld[$newConfigKey]);
            
            $newConfigValue = '';
            if(is_array($newValues) && count($newValues))
            {
                switch($oldConfigEntry['type'])
                {
                    case 'multiCheckBox':
                        $activeValues = explode(', ', $oldConfigEntry['value']);
                        foreach($activeValues as $activeKey => $activeValue)
                        {
                            if(array_key_exists($activeValue, $newValues))
                            {
                                $newConfigValue = $newValues[$activeValue];
                            }
                        }
                        break;
                    default:
                        $newConfigValue = '';
                        break;
                }
                
                if(!is_null($newConfigValue && strlen($newConfigValue)))
                {
                    $oldConfigEntry['value'] = $newConfigValue;
                }
            }
            
            $config[$key] = $oldConfigEntry;
        }
        
        //return $config;
        return [];
    }
    
    public function write($pluginSetId, $pluginName, $values)
    {
        $config = $this->configRepo->loadConfigurationByPluginId($this->getPluginIdByName($pluginName), $pluginSetId);
        
        foreach($values as $key => $value)
        {
            $mappedConfigKey = $this->keyMap[$value['key']];
            $oldConfigEntries = array_filter($config, function($entry) use ($mappedConfigKey) {
                return $entry->key == $mappedConfigKey;
            });
    
            $oldConfigKeys = array_keys($oldConfigEntries);
            $oldConfigKey = $oldConfigKeys[0];
            $oldConfigEntry = array_slice($oldConfigEntries, 0, 1);
            $oldConfigEntry = $oldConfigEntry[0];
            
            if($oldConfigEntry instanceof Configuration)
            {
                if(count($this->configMapOld[$value['key']]))
                {
                    if(is_bool($value['value']))
                    {
                        $value['value'] = $value['value'] ? 'true' : 'false';
                    }
                    $newValue = $this->configMapOld[$value['key']][$value['value']];
                }
                else
                {
                    $newValue = $value['value'];
                }
                
                $newConfigValue = null;
                switch($oldConfigEntry->type)
                {
                    case 'multiCheckBox':
                        $newConfigValue = $this->buildMultiCheckboxValue($oldConfigEntry->value, $newValue);
                        break;
                    case 'category':
                        $newConfigValue = $newValue;
                        break;
                    default:
                        $newConfigValue = $newValue;
                        break;
                }
                
                $newConfigEntry = $oldConfigEntry->toArray();
                $newConfigEntry['value'] = $newConfigValue;
                $config[$oldConfigKey] = $newConfigEntry;
            }
        }
    
        $this->configRepo->saveConfiguration($this->getPluginIdByName($pluginName), $config, $pluginSetId);
    }
    
    private function createConfigEntry($key, $value)
    {
        return [
          'key' => $key,
          'value' => $value
        ];
    }
    
    private function getPluginIdByName($pluginName)
    {
        /** @var PluginRepositoryContract $pluginRepo */
        $pluginRepo = pluginApp(PluginRepositoryContract::class);
        $pluginResult = $pluginRepo->searchPlugins(['name' => $pluginName], 1)->getResult();
        $pluginId = $pluginResult[0]->id;
        return $pluginId;
    }
    
    private function buildMultiCheckboxValue($oldValue, $newValue)
    {
        $activeValues = explode(', ', $oldValue);
        if(!count($activeValues) || !strlen($activeValues[0]))
        {
            $activeValues = [];
        }
        
        if(strlen($newValue))
        {
            if(!in_array($newValue, $activeValues))
            {
                $activeValues[] = $newValue;
            }
        }
        else
        {
            if(in_array($newValue, $activeValues))
            {
                $f = array_flip($activeValues);
                $key = $f[$newValue];
                unset($activeValues[$key]);
            }
        }
        
        $newValue = implode(', ', $activeValues);
        
        return $newValue;
    }
}