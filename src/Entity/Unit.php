<?php

namespace App\Entity;

use App\Repository\UnitRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=UnitRepository::class)
 */
class Unit
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $type;

    /**
     * @ORM\Column(type="integer")
     */
    private $effect_width;

    /**
     * @ORM\Column(type="integer")
     */
    private $movement_width;

    /**
     * @ORM\Column(type="integer")
     */
    private $health;

    /**
     * @ORM\Column(type="integer")
     */
    private $base_damage;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $attack_points;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $move_points;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $hybrid_points;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $icon;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getEffectWidth(): ?int
    {
        return $this->effect_width;
    }

    public function setEffectWidth(int $effect_width): self
    {
        $this->effect_width = $effect_width;

        return $this;
    }

    public function getMovementWidth(): ?int
    {
        return $this->movement_width;
    }

    public function setMovementWidth(int $movement_width): self
    {
        $this->movement_width = $movement_width;

        return $this;
    }

    public function getHealth(): ?int
    {
        return $this->health;
    }

    public function setHealth(int $health): self
    {
        $this->health = $health;

        return $this;
    }

    public function getBaseDamage(): ?int
    {
        return $this->base_damage;
    }

    public function setBaseDamage(int $base_damage): self
    {
        $this->base_damage = $base_damage;

        return $this;
    }

    public function getAttackPoints(): ?int
    {
        return $this->attack_points;
    }

    public function setAttackPoints(?int $attack_points): self
    {
        $this->attack_points = $attack_points;

        return $this;
    }

    public function getMovePoints(): ?int
    {
        return $this->move_points;
    }

    public function setMovePoints(?int $move_points): self
    {
        $this->move_points = $move_points;

        return $this;
    }

    public function getHybridPoints(): ?int
    {
        return $this->hybrid_points;
    }

    public function setHybridPoints(?int $hybrid_points): self
    {
        $this->hybrid_points = $hybrid_points;

        return $this;
    }

    public function getIcon(): ?string
    {
        return $this->icon;
    }

    public function setIcon(string $icon): self
    {
        $this->icon = $icon;

        return $this;
    }
}
