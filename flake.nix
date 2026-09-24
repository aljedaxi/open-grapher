{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = { nixpkgs, self, flake-utils, ... }: flake-utils.lib.eachDefaultSystem (system:
    let pkgs = nixpkgs.legacyPackages.${system}; in
    {
      devShells.default = pkgs.mkShell {
        packages = with pkgs; [nodejs];
        shellHook = ''exec zsh'';
      };
      packages.default = pkgs.buildNpmPackage {
        dontNpmBuild = true;
        name = "open-grapher";
        npmDepsHash = "sha256-71qi5FmVVbWfCwmefhHKZfzSHFDf+LsQu/q13zPl0ZI=";
        src = ./.;
      };
      apps.default = {
	      type = "app";
	      program = "${self.packages."${system}".default}/lib/node_modules/open-grapher/index.js";
      };
    });
}
