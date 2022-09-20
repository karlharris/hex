<?php

declare(strict_types=1);

namespace App\Game;

class FieldHelper
{
    protected array $rowMap = [
        '1' => 'A',
        '2' => 'B',
        '3' => 'C',
        '4' => 'D',
        '5' => 'E',
        '6' => 'F',
        '7' => 'G',
        '8' => 'H',
        '9' => 'I',
        '10' => 'J',
        '11' => 'K',
        '12' => 'L',
        '13' => 'M',
        '14' => 'N',
        '15' => 'O'
    ];

    public function getBlankField(): array
    {
        $field = [];
        $count = 1;
        for ($i = 1; $i < 16; $i++) {
            for ($j = 1; $j < 15; $j++) {
                $id = $this->rowMap[$i].'-'.$j;
                $field[$id] = [
                    'id' => $id,
                    'owner' => (in_array($this->rowMap[$i], ['A','B','C'])
                        ? 'Opponent'
                        : (in_array($this->rowMap[$i], ['M','N','O'])
                            ? 'User'
                            : 'No man´s land')),
                    'isBaseArea' => in_array($this->rowMap[$i], ['A','B','C','M','N','O']),
                ];
                $count++;
            }
        }
        return $field;
    }
}
