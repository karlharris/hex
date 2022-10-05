<?php

declare(strict_types=1);

namespace App\Game;

use App\Repository\UnitRepository;

class UnitHelper
{
    private UnitRepository $unitRepository;

    public function __construct(UnitRepository $unitRepository)
    {
        $this->unitRepository = $unitRepository;
    }

    public function getAllUnits(): ?array
    {
        $return = [];
        $result = $this->unitRepository->findAll();
        foreach ($result as $unit) {
            $return[$unit->getId()] = $unit;
        }
        return $return;
    }
}
