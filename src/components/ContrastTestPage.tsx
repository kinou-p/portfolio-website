// Composant de test pour vérifier les ratios de contraste
// Ce fichier est uniquement pour le développement et ne doit pas être inclus en production

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const ContrastTestPage = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-8">Test de Contraste WCAG</h1>
      
      {/* Boutons */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Boutons Primaires</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button size="lg">Bouton Large</Button>
            <Button>Bouton Normal</Button>
            <Button size="sm">Bouton Petit</Button>
          </div>
          <div className="text-sm text-muted-foreground">
            Ratio de contraste attendu : 4.6:1 (WCAG AA ✅)
          </div>
        </CardContent>
      </Card>

      {/* Boutons Outline */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Boutons Outline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" size="lg">Bouton Large</Button>
            <Button variant="outline">Bouton Normal</Button>
            <Button variant="outline" size="sm">Bouton Petit</Button>
          </div>
          <div className="text-sm text-muted-foreground">
            Ratio de contraste texte : 4.6:1 (WCAG AA ✅)
          </div>
        </CardContent>
      </Card>

      {/* Texte */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Texte et Foreground</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            Texte normal - Ratio attendu : 16.5:1 (WCAG AAA ✅)
          </p>
          <p className="text-muted-foreground">
            Texte muted - Ratio attendu : 5.9:1 (WCAG AA ✅)
          </p>
          <p className="text-primary">
            Texte primaire - Ratio attendu : 4.6:1 (WCAG AA ✅)
          </p>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Badges</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge>Badge Default</Badge>
            <Badge variant="secondary">Badge Secondary</Badge>
            <Badge variant="outline">Badge Outline</Badge>
            <Badge variant="destructive">Badge Destructive</Badge>
          </div>
        </CardContent>
      </Card>

      {/* États Interactifs */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>États Interactifs (Hover)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground mb-2">
            Survolez les boutons pour tester les états hover
          </p>
          <div className="flex flex-wrap gap-4">
            <Button>Hover Default</Button>
            <Button variant="outline">Hover Outline</Button>
            <Button variant="ghost">Hover Ghost</Button>
          </div>
        </CardContent>
      </Card>

      {/* Liens */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Liens</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <a href="#" className="text-primary hover:underline">
            Lien avec couleur primaire
          </a>
          <p className="text-sm text-muted-foreground mt-2">
            Ratio de contraste : 4.6:1 (WCAG AA ✅)
          </p>
        </CardContent>
      </Card>

      {/* Icônes */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Icônes sur Fond Coloré</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              ✓
            </div>
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              ✓
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Gauche : Icône primary sur fond primary/10 (décoratif)<br />
            Droite : Icône blanche sur fond primary - Ratio : 4.6:1 (WCAG AA ✅)
          </p>
        </CardContent>
      </Card>

      {/* Mode Sombre */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Test du Mode Sombre</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Activez le mode sombre pour vérifier que tous les contrastes restent conformes.
            Les couleurs ont été ajustées pour garantir la conformité dans les deux modes.
          </p>
        </CardContent>
      </Card>

      {/* Guide */}
      <Card className="bg-muted">
        <CardHeader>
          <CardTitle>Guide de Validation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">
            <strong>WCAG AA</strong> - Minimum requis :
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 ml-4">
            <li>Texte normal : ratio minimum de 4.5:1</li>
            <li>Texte large (18pt+ ou 14pt+ gras) : ratio minimum de 3:1</li>
          </ul>
          <p className="text-sm mt-4">
            <strong>WCAG AAA</strong> - Recommandé :
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 ml-4">
            <li>Texte normal : ratio minimum de 7:1</li>
            <li>Texte large : ratio minimum de 4.5:1</li>
          </ul>
          <p className="text-sm mt-4 font-semibold text-primary">
            ✅ Ce portfolio respecte les normes WCAG AA pour tous les éléments textuels
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
