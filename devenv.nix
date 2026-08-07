{ pkgs, lib, config, inputs, ... }:

{
  # Este archivo es la UNICA fuente de verdad del runtime de Node.
  # `languages.javascript.package` fija el binario de Node que queda en el PATH
  # (Node LTS 22 satisface el `engines` de Astro: >=22).
  #
  # No confundir con package.json: ahi `@types/node` solo son types de TS para el
  # editor/typecheck y deben apuntar al mismo major que este runtime (^22).
  # package.json NUNCA declara la version del runtime; solo gestiona dependencias.
  languages.javascript.enable = true;
  languages.javascript.package = pkgs.nodejs_22;
  languages.javascript.npm.enable = true;

  packages = [ pkgs.git ];

  tasks = {
    "site:dev".exec = "npm run dev";
    "site:build".exec = "npm run build";
    "site:preview".exec = "npm run preview";
  };

  enterShell = ''
    node --version
    npm --version
  '';
}
