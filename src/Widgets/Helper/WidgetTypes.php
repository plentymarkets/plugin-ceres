<?php

namespace Ceres\Widgets\Helper;

class WidgetTypes
{
    const DEFAULT = 'default';
    const STRUCTURE = 'structure';
    const STATIC = 'static';
    const HEADER = 'header';
    const FOOTER = 'footer';
    const ITEM = 'item';    // available on contents of type 'singleitem', 'setitem' and inside of each item set component
    const SINGLE_ITEM = 'singleitem';  // only available on contents of type 'singleitem'
    const SET_ITEM = 'setitem';  // only available on contents of type 'setitem'
    const SET_COMPONENT = 'setcomponent'; // available on contents of type 'singleitem' or inside of each item set component, but not in contents of type 'itemset'
    const SET_COMPONENT_ONLY = 'setcomponentonly'; // available inside of each item set component, but not the contents themselves
    const ITEM_CONTENT = 'itemcontent'; // available on contents of type 'singleitem' or 'setitem' but not inside of each item set component
    const CATEGORY_ITEM = 'categoryitem';
    const ITEM_SEARCH = 'itemsearch';
    const TOOLBAR = 'toolbar';
    const NAVIGATION = 'navigation';
    const CHECKOUT = 'checkout';
    const CUSTOMER = 'customer';
    const MY_ACCOUNT = 'myaccount';
    const FORM = 'form';
    const SOFT_LOGIN = 'softlogin';
}
