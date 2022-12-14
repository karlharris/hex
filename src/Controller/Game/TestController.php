<?php

declare(strict_types=1);

namespace App\Controller\Game;

use App\Game\FieldHelper;
use App\Game\UnitHelper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TestController extends AbstractController
{
    /**
     * @Route("/test", name="app_test")
     */
    public function test(Request $request, FieldHelper $fieldHelper, UnitHelper $unitHelper): Response
    {
        return $this->render('game/test.html.twig', [
            'unitArray' => $unitHelper->getAllUnits(),
            'fieldArray' => $fieldHelper->getBlankField(),
        ]);
    }
}
