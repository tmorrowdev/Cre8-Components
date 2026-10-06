"""The Regal Bank home page, expressed as a cre8-a2ui schema.

Structure follows the real brand's personal-banking landing page: green
utility bar, white primary nav, split hero with an inline login card, a row of
product tiles, a full-bleed promo band, then wellness / article / help
sections and the footer.

Two conventions this file sticks to, both of which are load-bearing rather
than stylistic:

  * `cre8-button` and the nav items render `${this.text}` and have no default
    slot, so their label goes in a `text` prop. Passing children instead
    renders a button with no visible label.
  * Plain `div`s appear only as layout wrappers (full-bleed backgrounds,
    max-width centring, column counts the grid variants don't cover).
    Anything carrying brand meaning — type, colour, spacing, interaction —
    is a cre8 component reading brand tokens.
"""

from __future__ import annotations

from typing import Any

Node = dict[str, Any]

# The site's content column.
_SHELL = "max-width:1200px;margin:0 auto;padding:0 24px;"


# ──────────────────────────────────────────────────────────────────────
# small builders
# ──────────────────────────────────────────────────────────────────────

def _div(style: str, children: list[Node], **props: Any) -> Node:
    return {
        "component": "div",
        "props": {"style": style, **props},
        "children": children,
    }


def _text(value: str) -> Node:
    return {"text": value}


def _heading(text: str, *, tag: str = "h2", type_: str = "headline-default",
             inverted: bool = False) -> Node:
    props: dict[str, Any] = {"tagVariant": tag, "type": type_}
    if inverted:
        props["inverted"] = True
    return {"component": "cre8-heading", "props": props, "children": [_text(text)]}


def _passage(text: str, *, size: str = "default", inverted: bool = False) -> Node:
    props: dict[str, Any] = {"size": size}
    if inverted:
        props["inverted"] = True
    return {
        "component": "cre8-text-passage",
        "props": props,
        "children": [{"html": f"<p>{text}</p>"}],
    }


def _button(text: str, *, variant: str = "primary", inverse: bool = False,
            tool: str | None = None, params: dict[str, Any] | None = None,
            prompt: str | None = None) -> Node:
    props: dict[str, Any] = {"text": text, "variant": variant}
    if inverse:
        props["inverse"] = True
    node: Node = {"component": "cre8-button", "props": props}
    if tool:
        event: dict[str, Any] = {"type": "tool", "toolName": tool}
        if params:
            event["params"] = params
        node["events"] = {"click": event}
    elif prompt:
        node["events"] = {"click": {"type": "prompt", "text": prompt}}
    return node


def _link(text: str, *, prompt: str) -> Node:
    """Teal chevron link. Uses a prompt event so clicking continues the chat."""
    return {
        "component": "cre8-text-link",
        "props": {"href": "#"},
        "events": {"click": {"type": "prompt", "text": prompt}},
        "slots": {"default": [_text(f"{text} ›")]},
    }


# ──────────────────────────────────────────────────────────────────────
# sections
# ──────────────────────────────────────────────────────────────────────

def _utility_bar() -> Node:
    segments = ["Personal Banking", "Wealth", "Small Business", "Commercial", "About"]
    utility = ["Locations", "Help & support", "En español"]
    return _div(
        "background:var(--cre8-color-header-bg-secondary);",
        [
            _div(
                _SHELL + "display:flex;justify-content:space-between;"
                "align-items:center;gap:16px;flex-wrap:wrap;",
                [
                    {
                        "component": "cre8-utility-nav",
                        "props": {"inverted": True, "navAriaLabel": "segments"},
                        "slots": {
                            "default": [
                                {
                                    "component": "cre8-utility-nav-item",
                                    "props": {"text": s, "href": "#"},
                                }
                                for s in segments
                            ]
                        },
                    },
                    {
                        "component": "cre8-utility-nav",
                        "props": {"inverted": True, "navAriaLabel": "utility"},
                        "slots": {
                            "default": [
                                {
                                    "component": "cre8-utility-nav-item",
                                    "props": {"text": u, "href": "#"},
                                }
                                for u in utility
                            ]
                        },
                    },
                ],
            )
        ],
    )


def _primary_nav() -> Node:
    items = [
        "Checking & savings",
        "Credit cards & loans",
        "Home loans",
        "Investments & planning",
        "Security & resources",
    ]
    wordmark = _div(
        "display:flex;align-items:center;gap:10px;flex-shrink:0;",
        [
            {
                "html": (
                    '<svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true" '
                    'style="flex-shrink:0">'
                    '<path d="M13 2 24 22H2L13 2z" fill="var(--cre8-color-bg-brand-strong)"/>'
                    '<path d="M13 9.5 18.5 19h-11L13 9.5z" fill="#ffffff"/>'
                    "</svg>"
                )
            },
            {
                "component": "cre8-heading",
                "props": {"tagVariant": "h1", "type": "title-default"},
                "slots": {"default": [_text("Regal Bank")]},
            },
        ],
    )
    return _div(
        "background:var(--cre8-color-header-bg-default);"
        "border-bottom:1px solid var(--cre8-color-border-default);"
        "position:sticky;top:0;z-index:20;",
        [
            _div(
                _SHELL + "display:flex;align-items:center;justify-content:space-between;"
                "gap:24px;padding-top:14px;padding-bottom:14px;flex-wrap:wrap;",
                [
                    wordmark,
                    {
                        "component": "cre8-link-list",
                        "props": {"behavior": "horizontal", "size": "sm"},
                        "slots": {
                            "default": [
                                {
                                    "component": "cre8-link-list-item",
                                    "props": {"href": "#"},
                                    "slots": {"default": [_text(i)]},
                                }
                                for i in items
                            ]
                        },
                    },
                    _div(
                        "display:flex;gap:8px;align-items:center;",
                        [
                            _button(
                                "Open an account",
                                tool="open_account",
                                params={"source": "primary-nav"},
                            ),
                            _button("Log in", variant="secondary",
                                    prompt="Show me the Regal Bank online banking login"),
                        ],
                    ),
                ],
            )
        ],
    )


def _hero() -> Node:
    login_card = {
        "component": "cre8-card",
        "props": {"data-cre8-form-scope": True},
        "slots": {
            "header": [_heading("Log in to Online Banking", tag="h2", type_="title-default")],
            "default": [
                _passage("Monitor your accounts, make payments, move money and more.",
                         size="small"),
                {
                    "component": "cre8-field",
                    "props": {
                        "label": "Online ID",
                        "name": "online_id",
                        "type": "text",
                        "autocomplete": "username",
                    },
                },
                {
                    "component": "cre8-field",
                    "props": {
                        "label": "Password",
                        "name": "password",
                        "type": "password",
                        "autocomplete": "current-password",
                    },
                },
                _div("margin-top:16px;", [_button("Log in", tool="log_in")]),
            ],
            "footer": [
                _div(
                    "display:flex;gap:16px;flex-wrap:wrap;",
                    [
                        _link("Enroll in Online Banking",
                              prompt="How do I enroll in Regal Bank online banking?"),
                        _link("Privacy & Security",
                              prompt="Tell me about Regal Bank privacy and security"),
                    ],
                )
            ],
        },
    }

    copy = _div(
        "display:flex;flex-direction:column;gap:20px;align-items:flex-start;",
        [
            {
                "component": "cre8-heading",
                "props": {"tagVariant": "h2", "type": "display-small", "inverted": True},
                "slots": {
                    "default": [
                        _text("Open a Crown Checking account and we'll waive the "
                              "monthly fee for your first year.")
                    ]
                },
            },
            _passage("Offer available to new checking customers. Terms apply.",
                     size="small", inverted=True),
            _button("Open an account", inverse=True, tool="open_account",
                    params={"source": "hero", "product": "Crown Checking"}),
        ],
    )

    return _div(
        # Flat brand ink, not a gradient: the minimal identity doesn't blend.
        "background:var(--cre8-color-bg-brand-strong);",
        [
            _div(
                _SHELL + "display:grid;grid-template-columns:1.35fr 1fr;gap:48px;"
                "align-items:center;padding-top:56px;padding-bottom:56px;",
                [copy, login_card],
            )
        ],
    )


def _product_tiles() -> Node:
    tiles = [
        ("Checking", "Everyday accounts with no monthly fee options."),
        ("Savings", "Grow your balance with automatic transfers."),
        ("Credit cards", "Earn rewards on everyday spending."),
        ("Mortgages", "Buy, build or refinance a home."),
        ("Home equity", "Borrow against the value you've built."),
    ]
    return _div(
        "padding:56px 0;",
        [
            _div(
                _SHELL,
                [
                    _div(
                        "text-align:center;margin-bottom:32px;",
                        [_heading("Everyday banking options for you", type_="headline-large")],
                    ),
                    _div(
                        "display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));"
                        "gap:16px;",
                        [
                            {
                                "component": "cre8-card",
                                "props": {"align": "center"},
                                "events": {
                                    "click": {
                                        "type": "tool",
                                        "toolName": "explore_product",
                                        "params": {"product": name},
                                    }
                                },
                                "slots": {
                                    "header": [
                                        _heading(name, tag="h3", type_="title-small")
                                    ],
                                    "default": [_passage(blurb, size="small")],
                                    "footer": [
                                        _link("Learn more",
                                              prompt=f"Tell me about Regal Bank {name}")
                                    ],
                                },
                            }
                            for name, blurb in tiles
                        ],
                    ),
                ],
            )
        ],
    )


def _promo_band() -> Node:
    return {
        "component": "cre8-band",
        "props": {"variant": "branded"},
        "slots": {
                            "default": [
                _div(
                    "background:var(--cre8-color-bg-brand-strong);padding:56px 0;",
                    [
                        _div(
                            _SHELL + "display:flex;flex-direction:column;align-items:center;"
                            "text-align:center;gap:16px;",
                            [
                                _heading("Banking without the monthly fee",
                                         type_="headline-large", inverted=True),
                                _div(
                                    "max-width:640px;",
                                    [
                                        _passage(
                                            "We make it simple to free yourself from monthly "
                                            "fees on every Crown account. Avoid the "
                                            "fee when you meet easy requirements like setting "
                                            "up a qualifying direct deposit.",
                                            inverted=True,
                                        )
                                    ],
                                ),
                                _button("Explore Crown checking", inverse=True,
                                        tool="explore_product",
                                        params={"product": "Checking"}),
                            ],
                        )
                    ],
                )
            ]
        },
    }


def _wellness() -> Node:
    cards = [
        ("MANAGE MONEY", "Get a Grace Period",
         "Get extra time to make a deposit or transfer funds into your account to avoid "
         "overdraft fees."),
        ("PLAN FOR THE FUTURE", "Build a plan to reach goals",
         "Work with a banker to build a personalized plan to help you achieve your goals."),
        ("PROTECT ASSETS", "Control your cards",
         "Set up CardGuard controls to choose how your debit and credit "
         "cards can be used."),
    ]
    return _div(
        "background:var(--cre8-color-bg-subtle);padding:56px 0;",
        [
            _div(
                _SHELL,
                [
                    _div(
                        "text-align:center;margin-bottom:32px;",
                        [_heading("Smart solutions for financial wellness",
                                  type_="headline-large")],
                    ),
                    {
                        "component": "cre8-grid",
                        "props": {"variant": "3up", "gap": "lg"},
                        "slots": {
                            "default": [
                                {
                                    "component": "cre8-grid-item",
                                    "slots": {
                            "default": [
                                            {
                                                "component": "cre8-card",
                                                "slots": {
                                                    "header": [
                                                        {
                                                            "component": "cre8-heading",
                                                            "props": {
                                                                "tagVariant": "h4",
                                                                "type": "meta-small",
                                                                "brandColor": True,
                                                            },
                                                            "slots": {
                                                                "default": [_text(eyebrow)]
                                                            },
                                                        },
                                                        _heading(title, tag="h3",
                                                                 type_="title-default"),
                                                    ],
                                                    "default": [_passage(body, size="small")],
                                                    "footer": [
                                                        _link(
                                                            "Learn more",
                                                            prompt=f"Tell me about "
                                                                   f"Regal Bank: {title}",
                                                        )
                                                    ],
                                                },
                                            }
                                        ]
                                    },
                                }
                                for eyebrow, title, body in cards
                            ]
                        },
                    },
                ],
            )
        ],
    )


def _articles() -> Node:
    items = [
        ("CD vs. savings account: What's the difference?", "6 min read"),
        ("Pay yourself first budget: how to make saving a priority", "9 min read"),
        ("Personalized insights in mobile banking", "7 min read"),
        ("How much money should you keep in your checking account?", "6 min read"),
    ]
    return _div(
        "padding:56px 0;",
        [
            _div(
                _SHELL,
                [
                    _div(
                        "text-align:center;margin-bottom:32px;",
                        [
                            _heading("Financial tips and tools", type_="headline-large"),
                            _div(
                                "margin-top:8px;display:flex;justify-content:center;",
                                [
                                    _link(
                                        "Learn more about financial wellness",
                                        prompt="Show me Regal Bank financial wellness resources",
                                    )
                                ],
                            ),
                        ],
                    ),
                    {
                        "component": "cre8-grid",
                        "props": {"variant": "2up", "gap": "lg"},
                        "slots": {
                            "default": [
                                {
                                    "component": "cre8-grid-item",
                                    "slots": {
                            "default": [
                                            {
                                                "component": "cre8-card",
                                                "props": {"variant": "compact"},
                                                "slots": {
                                                    "default": [
                                                        _heading(title, tag="h3",
                                                                 type_="title-small"),
                                                        _div(
                                                            "margin-top:12px;",
                                                            [
                                                                {
                                                                    # variant="light" — the
                                                                    # unqualified badge paints
                                                                    # --cre8-color-bg-strong,
                                                                    # i.e. a solid black chip.
                                                                    "component": "cre8-badge",
                                                                    "props": {
                                                                        "text": f"Article · {mins}",
                                                                        "variant": "light",
                                                                    },
                                                                }
                                                            ],
                                                        ),
                                                    ]
                                                },
                                            }
                                        ]
                                    },
                                }
                                for title, mins in items
                            ]
                        },
                    },
                ],
            )
        ],
    )


def _help_band() -> Node:
    return _div(
        "background:var(--cre8-color-bg-subtle);padding:56px 0;",
        [
            _div(
                _SHELL + "text-align:center;display:flex;flex-direction:column;"
                "align-items:center;gap:12px;",
                [
                    _heading("We want to help you succeed", type_="headline-large"),
                    _div(
                        "max-width:680px;",
                        [
                            _passage(
                                "We are here to help you, whenever you need it, wherever you "
                                "are. Bank on the go with mobile and online banking or stop by "
                                "one of our 400 branches for dedicated, caring service from "
                                "our team of bankers."
                            )
                        ],
                    ),
                ],
            )
        ],
    )


def _find_branch() -> Node:
    return _div(
        "padding:56px 0;",
        [
            _div(
                _SHELL,
                [
                    _div(
                        "text-align:center;margin-bottom:32px;",
                        [_heading("Looking for more information?", type_="headline-large")],
                    ),
                    {
                        "component": "cre8-grid",
                        "props": {"variant": "3up", "gap": "lg"},
                        "slots": {
                            "default": [
                                {
                                    "component": "cre8-grid-item",
                                    "slots": {
                            "default": [
                                            {
                                                "component": "cre8-card",
                                                "props": {
                                                    "align": "center",
                                                    "data-cre8-form-scope": True,
                                                },
                                                "slots": {
                                                    "header": [
                                                        _heading(
                                                            "Find branches and ATMs",
                                                            tag="h3",
                                                            type_="title-default",
                                                        )
                                                    ],
                                                    "default": [
                                                        {
                                                            "component": "cre8-field",
                                                            "props": {
                                                                "label": "ZIP code",
                                                                "name": "zip",
                                                                "type": "text",
                                                                "placeholder": "35203",
                                                            },
                                                        },
                                                        _div(
                                                            "margin-top:16px;",
                                                            [
                                                                _button(
                                                                    "Find",
                                                                    tool="find_branch",
                                                                )
                                                            ],
                                                        ),
                                                    ],
                                                },
                                            }
                                        ]
                                    },
                                },
                                {
                                    "component": "cre8-grid-item",
                                    "slots": {
                            "default": [
                                            {
                                                "component": "cre8-card",
                                                "props": {"align": "center"},
                                                "slots": {
                                                    "header": [
                                                        _heading("Contact us", tag="h3",
                                                                 type_="title-default")
                                                    ],
                                                    "default": [
                                                        _passage(
                                                            "Reach a banker by phone, secure "
                                                            "message or in person.",
                                                            size="small",
                                                        )
                                                    ],
                                                    "footer": [
                                                        _link(
                                                            "Contact us",
                                                            prompt="How do I contact Regal Bank?",
                                                        )
                                                    ],
                                                },
                                            }
                                        ]
                                    },
                                },
                                {
                                    "component": "cre8-grid-item",
                                    "slots": {
                            "default": [
                                            {
                                                "component": "cre8-card",
                                                "props": {"align": "center"},
                                                "slots": {
                                                    "header": [
                                                        _heading("Learn more about mobile "
                                                                 "banking", tag="h3",
                                                                 type_="title-default")
                                                    ],
                                                    "default": [
                                                        _passage(
                                                            "Deposit checks, pay bills and "
                                                            "track spending from the app.",
                                                            size="small",
                                                        )
                                                    ],
                                                    "footer": [
                                                        _link(
                                                            "Explore the app",
                                                            prompt="Tell me about the Regal Bank "
                                                                   "mobile banking app",
                                                        )
                                                    ],
                                                },
                                            }
                                        ]
                                    },
                                },
                            ]
                        },
                    },
                ],
            )
        ],
    )


def _footer() -> Node:
    columns = {
        "Personal Banking": ["Checking accounts", "Savings accounts", "Credit cards",
                             "Home loans"],
        "Wealth": ["Investments", "Retirement", "Trust services"],
        "Small Business": ["Business checking", "Business lending", "Merchant services"],
        "About": ["Investor relations", "Careers", "Community engagement"],
    }
    return {
        "component": "cre8-footer",
        "slots": {
            "default": [
                _div(
                    _SHELL + "padding-top:48px;padding-bottom:24px;display:grid;"
                    "grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:32px;",
                    [
                        _div(
                            "",
                            [
                                _heading(title, tag="h3", type_="label-default"),
                                {
                                    "component": "cre8-link-list",
                                    "props": {"size": "sm", "spacing": "condensed"},
                                    "slots": {
                            "default": [
                                            {
                                                "component": "cre8-link-list-item",
                                                "props": {"href": "#"},
                                                "slots": {"default": [_text(label)]},
                                            }
                                            for label in links
                                        ]
                                    },
                                },
                            ],
                        )
                        for title, links in columns.items()
                    ],
                ),
                {"component": "cre8-divider"},
                _div(
                    _SHELL + "padding-top:24px;padding-bottom:48px;",
                    [
                        _passage(
                            "Regal Bank is a fictional brand. This page exists to show "
                            "cre8-wc rendering on-brand UI from a brand definition — it is "
                            "not a real financial institution, and nothing above is a real "
                            "product offer.",
                            size="small",
                        )
                    ],
                ),
            ]
        },
    }


# ──────────────────────────────────────────────────────────────────────
# page
# ──────────────────────────────────────────────────────────────────────

def regal_home_schema() -> dict[str, Any]:
    """Return the full cre8-a2ui schema for the Regal Bank home page."""
    return {
        "schema": "cre8-a2ui/1.0",
        "root": {
            "component": "cre8-main",
            "slots": {
                            "default": [
                    _utility_bar(),
                    _primary_nav(),
                    _hero(),
                    _product_tiles(),
                    _promo_band(),
                    _wellness(),
                    _articles(),
                    _help_band(),
                    _find_branch(),
                    _footer(),
                ]
            },
        },
    }


__all__ = ["regal_home_schema"]
