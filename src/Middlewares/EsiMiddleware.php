<?php

namespace Ceres\Middlewares;

use Plenty\Plugin\Http\Request;
use Plenty\Plugin\Http\Response;
use Plenty\Plugin\Middleware;

class EsiMiddleware extends Middleware
{
    const SSR_DIRECTIVE_START_EXPR = '/<!--\s*ESI:(\w+)\((.*?)\)\s*-->/m';
    const SSR_DIRECTIVE_END_EXPR = '/<!--\s*\/ESI\s*-->/m';
    
    public function before(Request $request)
    {
    
    }
    
    /**
     * After the request is processed, do nothing here.
     *
     * @param Request $request
     * @param Response $response
     * @return Response
     */
    public function after(Request $request, Response $response)
    {
        if($request->has('block'))
        {
            // liefere Inhalt für ESI Block aus ?block=xyz
            //$response->setContent($this->parseDirectives($response->content(), $request->get('block')));
            
            $response = $response->make($this->parseDirectives($response->content(), $request->get('block')), $response->status(), [
                'X-esi-id' => $request->get('block')
            ]);
            /*$response->withHeaders([
                                       'X-esi-id' => $request->get('block')
                                   ]);*/
        }
        else {
            /*$content = '<!-- ESI: header -->
                            ersetzen durch
                            <esi:include src="/?block=header">';
    
            $response->setContent($content);*/
            //$response->setContent($this->removeDirectives($response->content()));
            $response = $response->make($this->removeDirectives($response->content()), $response->status());
            
        }
        
        return $response;
    }
    
    public function parseDirectives($input, $key)
    {
        $directiveData = [
            'template' => '',
            'app' => '',
            'entries' => [],
            'globals' => [
                'templates' => []
            ]
        ];
        
        while (preg_match(self::SSR_DIRECTIVE_START_EXPR, $input, $match, PREG_OFFSET_CAPTURE) > 0) {
            $directiveName = $match[1][0];
            $directiveArg = trim($match[2][0]);
            
            $directiveData['template'] .= substr($input, 0, $match[0][1]);
            $input = substr($input, $match[0][1] + strlen($match[0][0]));
            
            if ($directiveName === $key) {
                preg_match(self::SSR_DIRECTIVE_END_EXPR, $input, $end, PREG_OFFSET_CAPTURE);
                $directiveContent = substr($input, 0, $end[0][1]);
                if(preg_match(self::SSR_DIRECTIVE_START_EXPR, $directiveContent, $wrongMatch, PREG_OFFSET_CAPTURE)) {
                    $directiveString = "ESI:$directiveName($directiveArg)";
                    $wrongDirectiveString = "ESI:{$wrongMatch[1][0]}({$wrongMatch[2][0]})";
                    throw new \Exception("Directive not closed correctly: Found '$wrongDirectiveString' before closing '$directiveString'.");
                }
                
                /*if ($directiveName === 'include') {
                    $directiveData['app'] = $directiveContent;
                    $directiveContent = '<!-- vue-ssr-outlet -->';
                }
                
                if ($directiveName !== 'off') {
                    $directiveData['template'] .= $directiveContent;
                }*/
                
                //$input = substr($input, $end[0][1] + strlen($end[0][0]));
                $input = $directiveContent;
                return $input;
            }
        }
        
        return '';
    }
    
    /**
     * Remove all SSR directives.
     * Remove contents inside SSR:on() directives and keep contents inside SSR:off() directives.
     *
     * @param string $input
     * @return string
     */
    public function removeDirectives($input)
    {
        $output = '';
        while (preg_match(self::SSR_DIRECTIVE_START_EXPR, $input, $match, PREG_OFFSET_CAPTURE) > 0) {
            $directiveName = $match[1][0];
            $directiveArg = trim($match[2][0]);
            
            $output .= substr($input, 0, $match[0][1]);
            $input = substr($input, $match[0][1] + strlen($match[0][0]));
            
            if ($directiveName !== 'entry') {
                preg_match(self::SSR_DIRECTIVE_END_EXPR, $input, $end, PREG_OFFSET_CAPTURE);
                $directiveContent = substr($input, 0, $end[0][1]);
                
                /*
                if ($directiveName === 'global' && preg_match('/<script.+type="application\/javascript".*?>/', $directiveContent)) {
                    $directiveContent = preg_replace('/<script.*?>/', '$0window["' . $directiveArg . '"] = $1', $directiveContent);
                }
                */
    
                //$directiveContent = '<esi:include src="/?block='.$directiveName.'"/>';
                $directiveContent = '<!--# include virtual="/?block='.$directiveName.'" -->';
                if ($directiveName !== 'on') {
                    $output .= $directiveContent;
                }
                
                $input = substr($input, $end[0][1] + strlen($end[0][0]));
            }
        }
        
        $output .= $input;
        
        return $output;
    }
}
